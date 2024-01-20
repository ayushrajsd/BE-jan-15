const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product name is required"],
    unique: [true, "Product name should be unique"],
    maxLength: [40, "Product name should not exceed 40 characters"],
  },
  price: {
    type: Number,
    required: [true, "Product price is required"],
    validate: {
      validator: function () {
        return this.price > 0;
      },
      message: "Price should be greater than 0",
    },
  },
  categories: {
    required: true,
    type: [String],
  },
  images: [String],
  averageRating: Number,
  discount: {
    type: Number,
    validate: {
      validator: function () {
        return this.discount < this.price;
      },
      message: "Discount should be less than price",
    },
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
