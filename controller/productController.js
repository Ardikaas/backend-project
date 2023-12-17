const Product = require('../models/productModel');

const ProductController = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    createProductReview
}

async function getAllProducts(req, res) {
    try {
        const product = await Product.find({})
        res.status(200).json({
          status: {
            code: 200,
            message: "Success"
          },
          data: product
        })
      } catch (error) {
        res.status(500).json({message: error.message})
    }
}

async function getProductById(req, res) {
    try {
        const product = await Product.findById(req.params.id)
        res.status(200).json({
          status: {
            code: 200,
            message: "Success"
          },
          data: product
        })
      } catch (error) {
        res.status(500).json({message: error.message})
      }
}

async function createProduct(req, res) {
    try {
        const product = await Product.create(req.body)
        res.status(200).json({
          status: {
            code: 200,
            message: "Success"
          },
          data: product
        })
      } catch (error) {
        res.status(500).json({message: error.message})
      }
}

async function updateProduct(req, res) {
    try {
        const {id} = req.params
        const product = await Product.findByIdAndUpdate(id, req.body)
        if(!product){
          return res.status(404).json({
            status: {
              code : 404,
              message : `cannot find any produt with ID ${id}`
            }
          })
        }
        const updateProduct = await Product.findById(id)
        res.status(200).json({
          status: {
            code: 200,
            message: "Data succesfully updated"
          },
          data: updateProduct
        })
    
      } catch (error) {
        res.status(500).json({message: error.message})
      }
}

async function deleteProduct(req, res) {
    try {
        const {id} = req.params
        const product = await Product.findByIdAndDelete(id)
        if(!product){
          return res.status(404).json({
            status: {
              code : 404,
              message : `cannot find any produt with ID ${id}`
            }
          })
        }
        res.status(200).json({
          status : {
            code : 200,
            message : "Data successfully deleted"
          }
        })
      } catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
      }
}

async function createProductReview(req, res){
  try {
    const {rating, comment} = req.body
  
    const product = await Product.findById(req.params.id)
    

    //bagian ini iz 
    if (product){
      const alreadyReviewed = product.reviews.find(           //intinya ngecek user dah pernah review apa blom
        (r) => r.user.toString() === req.user._id.toString()  //r.use ngambil dari db product.reviews (gaperlu diubah)
                                                              //req.user._id. ngecek user dari _id (perlu diubah)
      )
  
      if (alreadyReviewed){
        res.status(400).json({message: 'product already reviewed'})
      }

      
      const review = {
        name: req.user.name,                                  //req.user.name ngambil user name yang lagi login sekarang (perlu diubah)
        rating: Number(rating),
        comment,
        user: req.user._id,                                   //req.user._id ngambil user _id yang lagi login sekarang (perlu diubah)
      }
      //sampe sini
  
      product.reviews.push(review)
      product.numReviews = product.reviews.length
      product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length
  
      await product.save()
      res.status(201).json({
        status: {
          code : 201,
          message : "Review added"
        }
      })
    } else {
      res.status(404).json({
        status: {
          code : 404,
          message : `cannot find any produt with ID ${id}`
        }
      })
    }
  } catch (error) {
    console.log(error.message)
    res.status(500).json({message: error.message})
  }
}

module.exports = ProductController