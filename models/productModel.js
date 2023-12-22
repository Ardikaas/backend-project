const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true],
    },
    rating: {
      type: Number,
      required: [true],
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: [false],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true],
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter the product name"],
    },
    overview: {
      type: String,
      required: [true],
    },
    category: {
      type: String,
      required: [true],
    },
    quantity: {
      type: Number,
      required: [true],
    },
    description: {
      type: String,
      required: [false],
    },
    price: {
      type: Number,
      required: [true],
    },
    image: {
      type: String,
      required: [false],
    },
    reviews: [reviewSchema],
    rating: {
      type: Number,
      required: [true],
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
