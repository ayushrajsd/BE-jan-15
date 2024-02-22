const express = require("express");
const cors = require("cors");
const app = express();

function calculateFibonacci(number) {
  if (number <= 1) {
    return number;
  } else {
    return calculateFibonacci(number - 1) + calculateFibonacci(number - 2);
  }
}

app.use(cors());
app.get("/fib", (req, res) => {
  const { number, requestNumber } = req.query;
  console.log("handler fn ran for req", requestNumber);
  if (!number || isNaN(number)) {
    res.status(400).send("invalid input");
  }
  const answer = calculateFibonacci(number);
  res.status(200).json({
    staus: "success",
    message: answer,
    requestNumber,
  });
});

app.listen(3000, () => {
    console.log("server started at 3000");
});
