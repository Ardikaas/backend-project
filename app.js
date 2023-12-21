const express = require("express");
const mongoose = require("mongoose");
const ProductController = require("./controller/productController");
const UserController = require("./controller/userController");
const protect = require("./middleware/authMiddleware");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const User = require("./models/userModel");
const expressSession = require("express-session");

passport.use( new GoogleStrategy({
  clientID: "466682886251-aqceprl95ungd9bpvdjlu8909ptlg26b.apps.googleusercontent.com",
  clientSecret: "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",
  callbackURL: "http://localhost:8080/auth/google/callback"},

function(accessToken, refreshToken, profile, cb) {
  User.findOrCreate(
    { googleId: profile.id }, 
    { username: profile.displayName,
      email: profile.emails[0].value,
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      role: "user"
    },
  
    function (err, user) {
    return cb(err, user);
  });
}));

const uri = "mongodb://127.0.0.1:27017/backend";
const app = express();
const port = 8080;

app.use(expressSession({ 
  secret: 'CattoGetto',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
 }))
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(user, done) {
  done(null, user);
});

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

app.post("/api/products/:id/reviews", protect, async (req, res) => {
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

app.post("/user/login", async (req, res) => {
  UserController.loginUser(req, res);
});

app.get("/user/logout", async (req, res) => {
  UserController.logoutUser(req, res);
});

app.get("/auth/google/success", (req, res) => {
  res.render("loginsuccess", { title: "Login Success", user: req.session.user });
});

app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

app.get("/auth/google/callback", passport.authenticate("google", { failureRedirect: "/user/login" }),
  (req, res) => {
    const session = req.session;
    res.json(session);
  }
);

app.listen(port, () => {
  console.log(`listening on port http://localhost:${port}`);
});
