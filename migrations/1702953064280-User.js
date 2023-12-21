const User = require("../models/userModel");

async function up () {
  User.createCollection().then(function (collection) { 
    console.log('Collection is created!'); 
});
}

async function down () {
  User.dropCollection().then(function (collection) { 
    console.log('Collection is dropped!'); 
});
}

module.exports = { up, down };
