const mongoose = require("mongoose");

const products = mongoose.Schema({
  productid: {
    type: String,
    required: [true],
  },
  name: {
    type: String,
    required: [true],
  },
  overview: {
    type: String,
    required: [true],
  },
  image: {
    type: String,
    required: [false],
  },
  quantity: {
    type: String,
    required: [true],
    min: 1,
  },
  price: {
    type: Number,
    required: [true],
  },
});

const checkoutSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true],
    },
    phone: {
      type: String,
      required: [true],
    },
    products: [products],
    address: {
      street: {
        type: String,
        required: [true],
      },
      city: {
        type: String,
        required: [true],
      },
      state: {
        type: String,
        required: [true],
      },
      zipCode: {
        type: String,
        required: [true],
      },
      country: {
        type: String,
        required: [true],
      },
    },
    paymentMethode: {
      type: String,
      enum: [
        "crediit_card",
        "paypal",
        "bank_transfer",
        "dana",
        "indomaret",
        "alfamaret",
      ],
      required: [true],
    },
    totalPrice: {
      type: Number,
      required: [true],
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid"],
      default: "paid",
    },
    orderStatus: {
      type: String,
      enum: ["processing", "shipped", "delivered"],
      default: "delivered",
    },
  },
  {
    timestamps: true,
  }
);

const Checkout = mongoose.model("Checkout", checkoutSchema);

module.exports = Checkout;
