const Product = require("../models/productModel");
const User = require("../models/userModel");
const Checkout = require("../models/checkoutModel");

const CheckoutContoller = {
  checkout,
  checkoutNow,
};

async function checkout(req, res) {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    const products = user.cart;

    const totalPrice = products.reduce((total, product) => {
      return total + product.quantity * product.price;
    }, 0);

    const address = {
      street: req.body.street,
      city: req.body.city,
      state: req.body.state,
      zipCode: req.body.zipCode,
      country: req.body.country,
    };
    const data = {
      name: req.body.name,
      phone: req.body.phone,
      products: products,
      address: address,
      paymentMethode: req.body.paymentMethode,
      totalPrice: totalPrice,
    };

    await Checkout.create(data);
    history = user.history.concat(
      user.cart.map((product) => ({
        productid: product.productid,
        name: product.name,
        overview: product.overview,
        image: product.image,
        quantity: req.body.quantity,
        price: product.price,
      }))
    );

    user.cart = [];
    user.history = history;
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

async function checkoutNow(req, res) {
  try {
    const product = await Product.findById(req.params.id);
    const userId = req.user._id;
    const user = await User.findById(userId);

    const totalPrice = product.price * req.body.quantity;

    const products = {
      productid: product.id,
      name: product.name,
      overview: product.overview,
      image: product.image,
      quantity: req.body.quantity,
      price: product.price,
    };

    const address = {
      street: req.body.street,
      city: req.body.city,
      state: req.body.state,
      zipCode: req.body.zipCode,
      country: req.body.country,
    };

    const data = {
      name: req.body.name,
      phone: req.body.phone,
      products: products,
      address: address,
      paymentMethode: req.body.paymentMethode,
      totalPrice: totalPrice,
    };

    await Checkout.create(data);

    const history = {
      productid: product.id,
      name: product.name,
      overview: product.overview,
      image: product.image,
      quantity: req.body.quantity,
      price: product.price,
    };
    user.history.push(history);
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
module.exports = CheckoutContoller;
