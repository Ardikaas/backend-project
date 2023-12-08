const mongoose = require('mongoose')

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter the product name"]
    },
    quantity : {
      type: Number,
      require: [true]
    },
    price: {
      type: Number,
      required: [true],
    },
    image: {
      type: String,
      required: false,
    }
  },
  {
    timestamps: true
  }
)

const Product = mongoose.model('Product', productSchema);

module.exports = Product;