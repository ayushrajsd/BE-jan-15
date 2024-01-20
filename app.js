const express = require("express");
const fs = require("fs");
const short = require("short-uuid");
const mongoose = require("mongoose");
const User = require("./models/userModel");
const {
  getUserHandler,
  createUserhandler,
  getuserById,
  updateUserById,
  deleteUserById,
  checkInput,
} = require("./controllers/userController");

const {
  getProductHandler,
  createProducthandler,
  getproductById,
  updateProductById,
  deleteProductById,
} = require("./controllers/productController");

require("dotenv").config(); // to read .env file and make them available in process.env
console.log(process.env.PORT);
const PORT = process.env.PORT || 3300;

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

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} request to ${req.path}`);
  next();
});

// app.use(function(req, res, next) {
//    if(isEmpty){
//     // return error
//    } else{
//     next()
//    }

// })

// app.use(function (req, res) {
//     res.status(200).send("Hello World");
//   });

// app.use(checkInput)

app.get("/api/user", getUserHandler);
app.post("/api/user", checkInput, createUserhandler);
app.get("/api/user/:id", getuserById);
app.patch("/api/user/:id", updateUserById);
app.delete("/api/user/:id", deleteUserById);

/** priduct routes */
app.get("/api/product", getProductHandler);
app.post("/api/product", createProducthandler);
app.get("/api/product/:id", getproductById);
app.delete("/api/product/:id", deleteProductById);
app.patch("/api/product/:id", updateProductById);

app.use(function (req, res) {
  res.status(404).send("404 Not Found");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
