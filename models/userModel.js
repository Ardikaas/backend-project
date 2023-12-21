const mongoose = require("mongoose");
const findOrCreate = require("mongoose-findorcreate");

const cartSchema = mongoose.Schema({
  productid: {
    type: String,
    required: [true],
  },
  name: {
    type: String,
    required: [true],
  },
  image: {
    type: String,
    required: [false],
  },
  quantity: {
    type: Number,
    required: [true],
  },
  price: {
    type: Number,
    required: [true],
  },
});

const wishlistSchema = mongoose.Schema({
  productid: {
    type: String,
    required: [true],
  },
  name: {
    type: String,
    required: [true],
  },
  price: {
    type: Number,
    required: [true],
  },
  image: {
    type: String,
    required: [false],
  },
});

const historySchema = mongoose.Schema({
  productid: {
    type: String,
    required: [true],
  },
  quantity: {
    type: Number,
    required: [true],
  },
  date: {
    type: Date,
    required: [true],
  },
});

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please enter the username"],
    },
    password: {
      type: String,
      require: [true],
    },
    email: {
      type: String,
      required: [true, "Please enter the email"],
    },
    firstName: {
      type: String,
      required: [false],
    },
    lastName: {
      type: String,
      required: [false],
    },
    birthDate: {
      type: Date,
      required: [false],
    },
    avatar: {
      type: String,
      required: [false],
      default: "/path/defaultpic.png",
    },
    role: {
      type: String,
      required: [false],
      default: "user",
    },
    wishlist: [wishlistSchema],
    cart: [cartSchema],
    history: [historySchema],
  },
  {
    timestamps: true,
  }
);

userSchema.plugin(findOrCreate);
const User = mongoose.model("User", userSchema);

module.exports = User;
