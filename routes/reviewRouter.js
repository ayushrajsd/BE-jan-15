const express = require("express");

const reviewRouter = express.Router();
const Review = require("../models/reviewModel");
const Product = require("../models/productModel");
const {protectRoute} = require("../controllers/authController");

reviewRouter.post("/:productId", protectRoute, async (req, res) => {
  /**
   * 1. get the produvt id fronm the params
   * 2. get the review and rating from the body
   * 3. get the user id from the req object
   * 4. update / add the rating and review to the product
   * 5. create a review object
   * 6. push the review id in the product reviews array
   */
  try {
    const userId = req.userId;
    const productId = req.params.productId;
    const { review, rating } = req.body;

    const reviewObj = await Review.create({
      review,
      rating,
      user: userId,
      product: productId,
    });
    /** update review on the product */
    const productObj = await Product.findById(productId);
    const averageRating = productObj.averageRating;
    if (averageRating) {
      const sum = averageRating * productObj.reviews.length; // 4.5 * 2 = 9
      const finalAverageRating =
        (sum + rating) / (productObj.reviews.length + 1);
      productObj.averageRating = finalAverageRating;
    } else {
      productObj.averageRating = rating;
    }
    productObj.reviews.push(reviewObj._id);
    await productObj.save();
    res.status(200).json({
      message: "review added successfully",
      data: reviewObj,
    });
  } catch (err) {
    console.log(err);
  }
});

reviewRouter.get("/:productId", async (req, res) => {});

module.exports = reviewRouter;
