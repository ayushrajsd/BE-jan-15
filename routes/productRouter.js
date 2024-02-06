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
const { checkInput } = require("../utils/crudFactory");
const { protectRoute, isAuthorized } = require("../controllers/authController");

const authorizedProductRoles = ["admin", "ceo", "sales"];

/** rotutes for Products */
productRouter.get("/", getProducts);
productRouter.post("/", checkInput, protectRoute, isAuthorized(authorizedProductRoles), createProducthandler);
productRouter.get("/bigBillionDay", getBigBillionProducts, getProducts);
productRouter.get("/:id", getproductById);
productRouter.patch("/:id", updateProductById);
productRouter.delete("/:id", protectRoute, isAuthorized(authorizedProductRoles),deleteProductById);


async function getBigBillionProducts(req, res, next) {
  req.query.filter = JSON.stringify({ stock: { lt: 10 },averageRating: { gt: 4 }});
  next()
}

async function getProducts(req, res) {
  /**
   * pagination logic will be implemented using limit and skip method
   * limit will be used to limit the number of documents to be returned
   * skip will be used to skip the documents
   * sort will be used to sort the documents
   * select will be used to select the fields to be returned
   */
  const sortQuery = req.query.sort;
  const selectQuery = req.query.select;
  const limit = req.query.limit;
  const page = req.query.page;
  const skip = (page - 1) * limit; // if I am on page 3 and I am displaying 10 items per page then I need to skip 20 items
  console.log("skip ", skip);
  /** filter  */
  const filterQuery = req.query.filter;
  console.log("filter query ", filterQuery);



  console.log("sort query ", sortQuery);
    console.log("select query ", selectQuery);
    // let queryResPromise;
  /** sorting logic */
  let queryResPromise = Product.find();
  // if (sortQuery) {
  //   const [sortParam, order] = sortQuery.split(" ");
  //   console.log("sortParam", sortParam);
  //   console.log("order", order);
  //   if (order === "asc") {
  //     queryResPromise = queryResPromise.sort(sortParam);
  //   } else {
  //     queryResPromise = queryResPromise.sort(`-${sortParam}`);
  //   }
  // }
  // if(selectQuery){
  //   queryResPromise = queryResPromise.select(selectQuery)
  // }
  // if(limit){
  //   queryResPromise = queryResPromise.skip(skip).limit(limit)
  // }
  if(filterQuery){
    console.log("reached filter query")
   console.log("filter query ", filterQuery); 
   const filterObj = JSON.parse(filterQuery) // step ensures that your filter query is a valid json
   console.log("filter obj ", filterObj)
   const filterObjStr = JSON.stringify(filterObj).replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`)
   const filterObjFinal = JSON.parse(filterObjStr)
   console.log("filter obj final ", filterObjFinal)
   queryResPromise = await queryResPromise.find(filterObjFinal)
   

  }
  const result = await queryResPromise;

  res.status(200).json({
    message: "search successfull",
    data: result,
  });
}

module.exports = productRouter;
