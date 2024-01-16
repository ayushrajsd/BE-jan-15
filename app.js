const express = require("express");
const fs = require("fs");
const short = require("short-uuid");
// const dotenv = require('dotenv')
// dotenv.config()
require("dotenv").config(); // to read .env file and make them available in process.env
console.log(process.env.PORT);
const PORT = process.env.PORT || 3300;

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

app.get("/api/user", (req, res) => {
  try {
    let msg = "";
    if (userData.length === 0) {
      msg = "No user found";
    } else {
      msg = "Data found";
    }
    res.json({
      status: 200,
      message: msg,
      data: userData,
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: err.message,
    });
  }
});

app.post("/api/user", (req, res) => {
  console.log("request body", req.body);
  //   console.log(req);
  const id = short.generate();
  const userDetails = req.body;
  const isEmpty = Object.keys(userDetails).length === 0;
  if (isEmpty) {
    res.status(400).json({
      status: 400,
      message: "Body cannot be empty",
    });
  } else {
    userDetails.id = id;
    console.log("new user", userDetails);
    userData.push(userDetails);
    fs.writeFile("./data.json", JSON.stringify(userData), (err) => {
      if (err) {
        console.log(err);
      }
      res.json({
        status: 200,
        message: "User added successfully",
        data: userDetails,
      });
    });
  }
});

app.get("/api/user/:id", (req, res) => {
  try {
    const { id } = req.params;
    console.log("userid", id);
    const user = userData.find((user) => user.id === id);
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
});

app.use(function (req, res) {
  res.status(404).send("404 Not Found");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
