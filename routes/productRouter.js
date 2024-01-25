const Product = require("../models/productModel");
const express = require("express");
const productRouter = express.Router();
const {
  getProductHandler,
  createProducthandler,
  getproductById,
  updateProductById,
  deleteProductById,
} = require("../controllers/productController");

/** rotutes for Products */
productRouter.get("/", getProducts);
productRouter.post("/", createProducthandler);
productRouter.get("/:id", getproductById);
productRouter.patch("/:id", updateProductById);
productRouter.delete("/:id", deleteProductById);

async function getProducts(req, res) {
  const sortQuery = req.query.sort;
  const selectQuery = req.query.select;
  console.log("sort query ", sortQuery);
    console.log("select query ", selectQuery);
  /** sorting logic */
  let queryResPromise = Product.find();
  if (sortQuery) {
    const [sortParam, order] = sortQuery.split(" ");
    console.log("sortParam", sortParam);
    console.log("order", order);
    if (order === "asc") {
      queryResPromise = queryResPromise.sort(sortParam);
    } else {
      queryResPromise = queryResPromise.sort(`-${sortParam}`);
    }
  }
  if(selectQuery){
    queryResPromise = queryResPromise.select(selectQuery)
  }
  const result = await queryResPromise;

  res.status(200).json({
    message: "search successfull",
    data: result,
  });
}

module.exports = productRouter;
