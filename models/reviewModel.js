const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    review: {
        type: String,
        required: [true, "Review can't be empty"]
    },
    rating:{
        type: Number,
        min: 1,
        max: 5
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:[true, "Review must belong to a user"]
    },
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        required:[true, "Review must belong to a product"]
    }

})

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;