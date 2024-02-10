const express = require("express");
const Razorpay = require("razorpay");
const shortid = require("shortid");
require("dotenv").config();
const cors = require("cors");
const crypto = require("crypto");

const app = express();
app.use(express.json());
app.use(cors());

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET_KEY,
});

const options = {
  amount: 50000, // amount in the smallest currency unit,
  currency: "INR",
  receipt: shortid.generate(),
};

instance.orders.create(options, (err, order) => {
  if (err) {
    console.log(err);
  }
  console.log(order);
});

app.post("/checkout", (req, res) => {
  const options = {
    amount: 100000, // amount in the smallest currency unit,
    currency: "INR",
    receipt: shortid.generate(),
  };
  instance.orders.create(options, (err, order) => {
    if (err) {
      console.log(err);
    }
    console.log(order);
    res.status(200).json({
      message: "order created",
      data: order,
    });
  });
});

app.post("/verify", (req, res) => {
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

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
