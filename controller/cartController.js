const Product = require("../models/productModel");
const User = require("../models/userModel");

const CartController = {
  addtoCart,
  deltoCart,
};

async function addtoCart(req, res) {
  try {
    const { quantity } = req.body;
    const product = await Product.findById(req.params.id);

    if (!req.user || !req.user._id) {
      res.status(400).json({ message: "Invalid user information" });
      return;
    }

    const userId = req.user._id;
    const user = await User.findById(userId);

    const data = {
      productid: product.id,
      name: product.name,
      overview: product.overview,
      price: product.price,
      quantity: quantity,
      image: product.image,
    };

    user.cart.push(data);
    await user.save();
    res.status(200).json({
      status: {
        code: 200,
        message: "Success",
      },
      data: data,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function deltoCart(req, res) {
  try {
    const product = await Product.findById(req.params.id);
    const userId = req.user._id;
    const user = await User.findById(userId);
    const cart = user.cart.findIndex((c) => c.productid === product.id);

    if (cart === -1) {
      res.status(401).json({
        status: {
          code: 401,
          message: "Product ID does not exist in cart",
        },
      });
      return;
    }

    user.cart.splice(cart, 1);
    await user.save();
    res.status(200).json({
      status: {
        code: 200,
        message: "Success",
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = CartController;
