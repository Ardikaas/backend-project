const express = require("express");
const mongoose = require("mongoose");
const ProductController = require("./controller/productController");
const UserController = require("./controller/userController");

const uri = "mongodb://127.0.0.1:27017/backend";
const app = express();
const port = 8080;

mongoose
  .connect(uri, {})
  .then((result) => console.log("database connected succesfully"))
  .catch((err) => console.log(err));
app.use(express.json());
app.set("view engine", "pug");

app.get("/", async (req, res) => {
  res.render("index", { title: "API Reference" });
});

app.get("/api", async (req, res) => {
  res.send("hai ngapain kesini?");
});

app.get("/api/products", async (req, res) => {
  ProductController.getAllProducts(req, res);
});

app.get("/api/products/:id", async (req, res) => {
  ProductController.getProductById(req, res);
});

app.put("/api/products/:id", async (req, res) => {
  ProductController.updateProduct(req, res);
});

app.post("/api/products", async (req, res) => {
  ProductController.createProduct(req, res);
});

app.delete("/api/products/:id", async (req, res) => {
  ProductController.deleteProduct(req, res);
});

app.post("/api/products/:id/reviews", async (req, res) => {
  ProductController.createProductReview(req, res);
});

app.get("/user", async (req, res) => {
  UserController.getAllUsers(req, res);
});

app.get("/user/:id", async (req, res) => {
  UserController.getUserById(req, res);
});

app.post("/user/register", async (req, res) => {
  UserController.createUser(req, res);
});

app.listen(port, () => {
  console.log(`listening on port http://localhost:${port}`);
});
