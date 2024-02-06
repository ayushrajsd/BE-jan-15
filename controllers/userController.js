const User = require("../models/userModel");
const { emailBuilder } = require("../nodemailer");
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

const createUserhandler = createFactory(User);
const getUserHandler = getAllFactory(User);
const getuserById = getElementByIdFactory(User);
const updateUserById = updateElementByIdFactory(User);
const deleteUserById = deleteElementByIdFactory(User);



module.exports = {
  getUserHandler,
  createUserhandler,
  getuserById,
  updateUserById,
  deleteUserById,
  checkInput
};
