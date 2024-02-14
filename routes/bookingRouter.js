const express = require("express");
// const shortid = require("shortid");
const { protectRoute } = require("../controllers/authController");
const bookingModel = require("../models/bookingModel");
const Razorpay = require("razorpay");
const User = require("../models/userModel");

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET_KEY,
});

const bookingRouter = express.Router();

bookingRouter.post("/:productId", protectRoute, async (req, res) => {
  try {
    const userid = req.userId;
    const product = req.params.productId;
    const { priceAtBooking } = req.body;
    const bookingObj = {
      user: userid,
      product: product,
      priceAtBooking: priceAtBooking,
    };
    const booking = await bookingModel.create(bookingObj);
    /** update user with booking details */
    const user = await User.findById(userid)
    user.bookings.push(booking._id);
    await user.save();

    var options = {
      amount: priceAtBooking * 100, // amount in the smallest currency unit
      currency: "INR",
      receipt: booking._id.toString(),
    };
    
    const order = await instance.orders.create(options);
    console.log("created order", order);
    /** updating booking with razor pay payment id */
    booking.paymentOrderId = order.id;
    await booking.save();
  } catch (err) {
    console.log(err);
  }
});

bookingRouter.get("/", protectRoute, async (req, res) => {
  try {
    const allBookings = await bookingModel
      .find()
      .populate({ path: "user", select: "name email" })
      .populate({ path: "product", select: "name price" });
    res.status(200).json({
      message: "success",
      data: allBookings,
    });
  } catch (err) {
    console.log(err);
  }
});

bookingRouter.post("/verify", async (req, res) => {
  try {
    console.log("webhook called", req.body);
    const shasum = crypto.createHmac("sha256", process.env.WEBHOOK_SECRET);
    shasum.update(JSON.stringify(req.body)); // add payloiad to the hash
    const freshSignature = shasum.digest("hex"); // hexadecimal string
    console.log(
      "comparing signatures",
      freshSignature,
      req.headers["x-razorpay-signature"]
    );
    if (freshSignature === req.headers["x-razorpay-signature"]) {
      console.log("request is legit");
      const booking = await bookingModel.findOne({
        paymentOrderId: req.body.payload.payment.entity.order_id,
      });
      booking.status = "confirmed";
      delete booking.paymentOrderId;
      await booking.save();
      res.json({
        status: "ok",
      });
    } else {
      return res.status(400).json({
        status: "error",
        message: "Invalid signature",
      });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = bookingRouter;
