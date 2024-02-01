const express = require("express");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const User = require("./models/userModel");
const mongoose = require("mongoose");
require("dotenv").config();

const SECRET_KEY = "SomeRandomKery@12321";

const app = express();
app.use(cookieParser());
app.use(express.json());

/** database connectiobn starts */
mongoose
  .connect(process.env.DB_URL)
  .then((connection) => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log(err);
  });

/** database connection ends */

// home

app.get("/", (req, res) => {
  res.cookie("pageVisited", "home", {
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true,
  });
  res.json({ message: "welcome to home page" });
});
// products
app.get("/products", (req, res) => {
  console.log(req.cookies);
  res.cookie("product", "bestseller", {
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true,
    path: "/products",
  });
  const { pageVisited } = req.cookies;
  if (pageVisited) {
    res.json({ message: "welcome to products page" });
  } else {
    res.json({
      message: "You are visiting for the first time",
    });
  }
});
// clear cookies
app.get("/clearCookie", (req, res) => {
  res.clearCookie("pageVisited", { path: "/" });
  res.json({
    message: "cookies cleared",
  });
});

app.get("/signin", async (req, res) => {
  const payload = 1234;
  try {
    jwt.sign(
      { data: payload },
      SECRET_KEY,
      { expiresIn: "1h" }, // options
      function (err, data) {
        if (err) {
          throw new Error(err.message);
        }
        res.cookie("token", data, {
          maxAge: 1000 * 60 * 60 * 24,
          httpOnly: true,
        });
        res.json({
          message: data,
        });
      }
    );
  } catch (err) {
    console.log(err);
  }
});

app.get("/verify", (req, res) => {
  try {
    const { token } = req.cookies;
    const decoded = jwt.verify(token, SECRET_KEY);
    res.json({
      message: decoded,
    });
  } catch (err) {
    console.log(err);
  }
});

app.post("/signup", async function (req, res) {
  try {
    const userObject = req.body;
    console.log("userObject", userObject);
    const user = await User.create(userObject);
    res.json({
      message: "user created",
      user,
    });
  } catch (err) {
    console.log(err);
  }
});
app.post("/login", async function (req, res) {
  // validate credentials
  // send token
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    console.log("user", user);
    if (!user) {
      res.status(400).json({
        message: "user not found",
      });
    } else {
      if (user.password === password) {
        const token = jwt.sign({ data: user._id }, SECRET_KEY);
        res.cookie("token", token, {
          maxAge: 1000 * 60 * 60 * 24,
          httpOnly: true,
        });
        res.json({
          message: "login successfull",
          data: user,
        });
      } else {
        res.status(400).json({
          message: "invalid credentials",
        });
      }
    }
  } catch (err) {
    console.log(err);
  }
});

const protectRoute = async function(req, res, next){
    try{
        const {token} = req.cookies;
        const decoded = jwt.verify(token, SECRET_KEY);
        const user = await User.findById(decoded.data);
        if(!user){
            res.status(400).json({
                message: "user not found",
            });
        }else{
            req.user = user;
            next();
        }


    }catch(err){
        console.log(err);
        res.status(400).json({
            message: "invalid token",
        });
    }
}

app.get("/userData", protectRoute,async function (req, res) {
    res.status(200).json({
        message: "user data fetched",
        data: req.user,
    });
});

app.log

app.listen(3000, () => {
  console.log("server started");
});
