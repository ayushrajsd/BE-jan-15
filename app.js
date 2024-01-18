const express = require("express");
const fs = require("fs");
const short = require("short-uuid");
const mongoose = require("mongoose");
// const dotenv = require('dotenv')
// dotenv.config()
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

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  confirmPassword: {
    type: String,
    required: true,
    minlength: 8,
    validate: {
      validator: function () {
        return this.password === this.confirmPassword;
      },
      message: "Password and confirm password should be same",
    },
  },
  address: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

const app = express();
const data = fs.readFileSync("./data.json", "utf8");
const userData = JSON.parse(data);
// console.log(userData);

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

app.get("/api/user", getUserHandler);
app.post("/api/user", createUserhandler);
app.get("/api/user/:id", getuserById);

/** route handlers */
async function getUserHandler(req, res) {
  try {
    // let msg = "";
    // if (userData.length === 0) {
    //   msg = "No user found";
    // } else {
    //   msg = "Data found";
    // }
    const userData = await User.find()
    if(userData.length === 0){
      throw new Error("No user found")
    }else{
      msg = "Data found"
      res.json({
        status: 200,
        message: msg,
        data: userData,
      });
    }
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: err.message,
    });
  }
}

async function createUserhandler(req, res) {
  try {
    const userDetails = req.body;
    const isEmpty = Object.keys(userDetails).length === 0;
    if (isEmpty) {
      res.status(400).json({
        status: 400,
        message: "Body cannot be empty",
      });
    } else {
      // userDetails.id = id;
      console.log("new user", userDetails);
      // userData.push(userDetails);
      // fs.writeFile("./data.json", JSON.stringify(userData), (err) => {
      //   if (err) {
      //     console.log(err);
      //   }
      //   res.json({
      //     status: 200,
      //     message: "User added successfully",
      //     data: userDetails,
      //   });
      // });
      const user = await User.create(userDetails);
      res.status(201).json({
        message: "User created successfully",
        data: user,
      });
    }
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: err.message,
    });
  }
  console.log("request body", req.body);
  //   console.log(req);
  // const id = short.generate();
}

async function getuserById(req, res) {
  try {
    const { id } = req.params;
    console.log("userid", id);
    // const user = userData.find((user) => user.id === id);
    const user = await User.findById(id);
    if (!user) {
      // res.status(404).json({
      //     status: 404,
      //     message: "User not found",
      //    })
      throw new Error("User not found");
    }
    res.json({
      status: 200,
      message: "User found",
      data: user,
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: err.message,
    });
  }
}

app.use(function (req, res) {
  res.status(404).send("404 Not Found");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
