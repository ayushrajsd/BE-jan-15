const Product = require("../models/productModel");
const {
  checkInput,
  getAllFactory,
  createFactory,
  getElementByIdFactory,
  updateElementByIdFactory,
  deleteElementByIdFactory,
} = require("../utils/crudFactory");

/** handlers */
/** route handlers */

const getProductHandler = getAllFactory(Product);
const createProducthandler = createFactory(Product);
const getproductById = getElementByIdFactory(Product);
const updateProductById = updateElementByIdFactory(Product);
const deleteProductById = deleteElementByIdFactory(Product);
const getProductCategories = async function(req, res) {
  res.json({
    message: "categories",
    data: ["electronics", "jewelery", "men's clothing", "women's clothing"]
  });
}

module.exports = {
  getProductHandler,
  createProducthandler,
  getproductById,
  updateProductById,
  deleteProductById,
  getProductCategories
};
