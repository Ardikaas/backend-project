const ProductController = require("./controller/productController");
const UserController = require("./controller/userController");
const WishlistController = require("./controller/wishlistController");
const CartController = require("./controller/cartController");
const Checkout = require("./controller/checkoutController");
const bodyParser = require("body-parser");
const passport = require("passport");
const User = require("./models/userModel");
const path = require("path");
const mongoose = require("mongoose");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const multer = require("multer");
const express = require("express");
const protect = require("./middleware/authMiddleware");
const expressSession = require("express-session");
require("dotenv").config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOSRTATCLIENTID,
      clientSecret: process.env.GOSRTATCLIENTSECRET,
      callbackURL: process.env.GOSTRATCALLBACKURL,
    },

    function (accessToken, refreshToken, profile, cb) {
      User.findOrCreate(
        { googleId: profile.id },
        {
          username: profile.displayName,
          email: profile.emails[0].value,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          role: "user",
        },

        function (err, user) {
          return cb(err, user);
        }
      );
    }
  )
);

const uri = process.env.URI;
const app = express();
const port = process.env.PORT;

app.use(
  expressSession({
    secret: "CattoGetto",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (user, done) {
  done(null, user);
});

mongoose
  .connect(uri, {})
  .then((result) => console.log("database connected succesfully"))
  .catch((err) => console.log(err));

const upload = (storage) => {
  return multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, `images/${storage}/`);
      },
      filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
      },
    }),
    fileFilter: (req, file, cb) => {
      const allowed = /jpeg|jpg|png|gif/;
      const isAllowedFile = allowed.test(
        path.extname(file.originalname).toLowerCase()
      );
      const isAllowedMime = allowed.test(file.mimetype);

      if (isAllowedFile && isAllowedMime) {
        cb(null, true);
      } else {
        cb(new Error("File harus berupa gambar (jpeg, jpg, png, gif)"), false);
      }
    },
  });
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join(__dirname, "images")));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

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

app.post("/api/products/wishlist/:id", protect, async (req, res) => {
  WishlistController.createWishlist(req, res);
});

app.delete("/api/products/wishlist/:id", protect, async (req, res) => {
  WishlistController.deleteWishlist(req, res);
});

app.post("/api/products/:id/cart", protect, async (req, res) => {
  CartController.addtoCart(req, res);
});

app.delete("/api/products/:id/cart", protect, async (req, res) => {
  CartController.deltoCart(req, res);
});

app.post("/user/checkout/:id", protect, async (req, res) => {
  Checkout.checkoutNow(req, res);
});

app.post("/user/checkout", protect, async (req, res) => {
  Checkout.checkout(req, res);
});

app.get("/user", async (req, res) => {
  UserController.getAllUsers(req, res);
});

app.get("/user/:id", async (req, res) => {
  UserController.getUserById(req, res);
});

app.post("/user/profile", protect, async (req, res) => {
  UserController.userProfile(req, res);
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

app.post("/user/email", async (req, res) => {
  UserController.inputEmail(req, res);
});

app.post("/user/otp", async (req, res) => {
  UserController.otpAuth(req, res);
});

app.post("/user/reset", protect, async (req, res) => {
  UserController.resetPassword(req, res);
});

app.post(
  "/user/avatar",
  protect,
  upload("avatars").single("avatar"),
  async (req, res) => {
    UserController.uploadAvatar(req, res);
  }
);

app.get("/user/avatar/:id", (req, res) => {
  UserController.userAvatar(req, res);
});

app.get("/auth/google/success", (req, res) => {
  res.render("loginsuccess", {
    title: "Login Success",
    user: req.session.user,
  });
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/user/login" }),
  (req, res) => {
    const session = req.session;
    res.json(session);
  }
);

app.listen(port, () => {
  // console.log(`listening on port http://localhost:${port}`);
});
