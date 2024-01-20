const Product = require("../models/productModel");

const checkInput = function (req, res, next) {
  console.log("req methid", req.method)
    const productDetails = req.body;
  const isEmpty = Object.keys(productDetails).length === 0;
  if (isEmpty) {
    res.status(400).json({
      status: 400,
      message: "Body cannot be empty",
    });
  } else {
    next();
  }
};

/** handlers */
/** route handlers */
async function getProductHandler(req, res) {
  try {
    // let msg = "";
    // if (productData.length === 0) {
    //   msg = "No product found";
    // } else {
    //   msg = "Data found";
    // }
    const productData = await Product.find();
    if (productData.length === 0) {
      throw new Error("No product found");
    } else {
      msg = "Data found";
      res.json({
        status: 200,
        message: msg,
        data: productData,
      });
    }
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: err.message,
    });
  }
}

async function createProducthandler(req, res) {
  try {
    const productDetails = req.body;
    //   const isEmpty = Object.keys(productDetails).length === 0;
    //   if (isEmpty) {
    //     res.status(400).json({
    //       status: 400,
    //       message: "Body cannot be empty",
    //     });
    //   } else {
    // productDetails.id = id;
    console.log("new product", productDetails);
    // productData.push(productDetails);
    // fs.writeFile("./data.json", JSON.stringify(productData), (err) => {
    //   if (err) {
    //     console.log(err);
    //   }
    //   res.json({
    //     status: 200,
    //     message: "Product added successfully",
    //     data: productDetails,
    //   });
    // });
    const product = await Product.create(productDetails);
    res.status(201).json({
      message: "Product created successfully",
      data: product,
    });
    //   }
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

async function getproductById(req, res) {
  try {
    const { id } = req.params;
    console.log("productid", id);
    // const product = productData.find((product) => product.id === id);
    const product = await Product.findById(id);
    if (!product) {
      // res.status(404).json({
      //     status: 404,
      //     message: "Product not found",
      //    })
      throw new Error("Product not found");
    }
    res.json({
      status: 200,
      message: "Product found",
      data: product,
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: err.message,
    });
  }
}

async function updateProductById(req, res) {
  try {
    console.log("request params", req.params);
    const { id } = req.params;
    const updatedProductData = req.body;
    console.log("productid", id);
    const updatedProduct = await Product.findByIdAndUpdate(id, updatedProductData, {
      new: true,
    });
    console.log("updated product", updatedProduct);
    if (!updatedProduct) {
      throw new Error("Product not found");
    } else {
      res.status(200).json({
        status: 200,
        message: "Product updated successfully",
        data: updatedProduct,
      });
    }
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: err.message,
    });
  }
}

async function deleteProductById(req, res) {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      throw new Error("Product not found");
    } else {
      res.status(200).json({
        status: 200,
        message: "Product deleted successfully",
        data: deletedProduct,
      });
    }
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: err.message,
    });
  }
}

module.exports = {
  getProductHandler,
  createProducthandler,
  getproductById,
  updateProductById,
  deleteProductById,
  checkInput,
};
