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

module.exports = {
  getProductHandler,
  createProducthandler,
  getproductById,
  updateProductById,
  deleteProductById,
};
