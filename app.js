const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/productModel')

const uri = "mongodb://127.0.0.1:27017/backend"
const app = express()
const port = 8080

mongoose.connect(uri, {})
  .then(result => console.log("database connected succesfully"))
  .catch(err => console.log(err))
app.use(express.json())

app.get('/api', async(req,res) =>{
  const data = {
    
  }
  res.status(200).json({
    status: {
      code: 200,
      message: "Success"
    },
    data: data
  })
})

app.get('/api/products', async (req, res) =>{
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
})

app.get('/api/products/:id', async (req,res) =>{
  try {
    const {id} = req.params
    const product = await Product.findById(id)
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
})

app.put('/api/products/:id', async (req,res) =>{
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
})

app.post('/api/products', async (req, res) =>{
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
})

app.delete('/api/products/:id', async (req, res) =>{
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
})

app.listen(port, ()=>{
  console.log(
    `listening on port http://localhost:${port}`
    )
});

