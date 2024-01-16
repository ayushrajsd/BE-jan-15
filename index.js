const express = require("express");
// const dotenv = require('dotenv')
// dotenv.config()
require("dotenv").config(); // to read .env file and make them available in process.env
console.log(process.env.PORT);

const PORT = process.env.PORT || 3300;
const app = express();

app.use(express.json());

app.use((req, res, next) => {
    console.log(`${req.method} request to ${req.path}`)
    next()
})

app.get("/api/user", (req, res) => {
  res.json({
    status: "success",
    statusCode: 200,
    data: {
      name: "John Doe",
      age: 30,
    },
  });
});

app.post("/api/user", (req, res) => {
  console.log("request body",req.body);
//   console.log(req);
  res.json({
    data: req.body,
  });
});
app.use(function (req, res) {
  res.status(200).send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
