const Product = require('../models/productModel');

class ProductController {
    static async getAllProducts(req, res) {
        try {
            const products = await Product.find({})
            res.json(products)
        } catch (error) {
            res.status(500).json({ message: "Server Error" })
        }
    }

    static async getProductById(req, res) {
        try {
            const product = await Product.findById(req.params.id)
            res.json(product)
        } catch (error) {
            res.status(500).json({ message: "Server Error" })
        }
    }

    static async createProduct(req, res) {
        try {
            const product = await Product.create(req.body)
            res.json(product)
        } catch (error) {
            res.status(500).json({ message: "Server Error" })
        }
    }

    static async updateProduct(req, res) {
        try {
            const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
            res.json(product)
        } catch (error) {
            res.status(500).json({ message: "Server Error" })
        }
    }

    static async deleteProduct(req, res) {
        try {
            const product = await Product.findByIdAndDelete(req.params.id)
            res.json(product)
        } catch (error) {
            res.status(500).json({ message: "Server Error" })
        }
    }
}

module.exports = ProductController