const express = require('express')
const mongoose = require('mongoose')
const ProductController = require('./controller/productController')

const uri = "mongodb://127.0.0.1:27017/backend"
const app = express()
const port = 8080

mongoose.connect(uri, {})
  .then(result => console.log("Database Connected Succesfully"))
  .catch(err => console.log(err))
app.use(express.json())
app.set('view engine', 'pug')

app.get('/', async(req,res) => {
  res.render('index', {title: 'API Reference'})
})

app.get('/api', async(req,res) =>{
  res.send('hai ngapain kesini?')
})

app.get('/api/products', async (req, res) =>{
  ProductController.getAllProducts(req, res)
})

app.get('/api/products/:id', async (req,res) =>{
  ProductController.getProductById(req, res)
})

app.put('/api/products/:id', async (req,res) =>{
  ProductController.updateProduct(req, res)
})

app.post('/api/products', async (req, res) =>{
  ProductController.createProduct(req, res)
})

app.delete('/api/products/:id', async (req, res) =>{
  ProductController.deleteProduct(req, res)
})

app.listen(port, ()=>{
  console.log(
    '==================================\n' +
    `Host : http://localhost:${port} \n\n` +
    'Running Server Locally\n' +
    '=================================='
    )
});

