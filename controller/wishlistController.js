const Product = require("../models/productModel");
const User = require("../models/userModel");

const WishlistController = {
  createWishlist,
  deleteWishlist,
};

async function createWishlist(req, res) {
  try {
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
      price: product.price,
      image: product.image,
    };

    user.wishlist.push(data);
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

async function deleteWishlist(req, res) {
  try {
    const product = await Product.findById(req.params.id);
    const userId = req.user._id;
    const user = await User.findById(userId);
    const wish = user.wishlist.findIndex((w) => w.productid === product.id);

    if (wish === -1) {
      res.status(401).json({
        status: {
          code: 401,
          message: "Product ID does not exist in wishlist",
        },
      });
      return;
    }

    user.wishlist.splice(wish, 1);
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

module.exports = WishlistController;
