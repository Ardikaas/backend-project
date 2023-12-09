const Product = require('../models/productModel');

async function up () {
  Product.createCollection().then(function (collection) { 
    console.log('Collection is created!'); 
});
}

async function down () {
  Product.dropCollection().then(function (collection) { 
    console.log('Collection is dropped!'); 
});
}

module.exports = { up, down };
