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

const otpGenerator = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

const forgetPassword = async (req, res) => {
  // send the token to the user's email
  try {
    // user sends their email
    const { email } = req.body;
    // verify that the email exists in the database
    const user = await User.findOne({ email });
    console.log("user", user);
    if (!user) {
      res.status(400).json({
        status: "fail",
        message: "User not found",
      });
    } else {
      // generate a random token
      const token = otpGenerator();
      user.token = token.toString();
      user.otpExpiry = Date.now() + 1000 * 60 * 5; // 5 minutes
      await user.save();
      emailBuilder(user.email, "Reset Password", `Your OTP is ${token}`)
        .then(() => {
          console.log("Email is sent");
        })
        .catch((err) => {
          console.log("Error in sending the email", err);
        });
      res.status(200).json({
        status: "success",
        message: "Token is sent to your email",
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

const resetPassword = async (req, res) => {
  // user send the token and the new password
  // verify that the token is valid
  // update the user's password
  try {
    const { token, password, email } = req.body;
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      res.status(400).json({
        status: "fail",
        message: "User not found",
      });
    } else {
      if (user.token !== token) {
        res.status(400).json({
          status: "fail",
          message: "Invalid token",
        });
      } else {
        if (user.otpExpiry < Date.now()) {
          res.status(400).json({
            status: "fail",
            message: "Token expired",
          });
        } else {
          user.password = password;
          user.token = undefined;
          user.otpExpiry = undefined;
          await user.save();
          res.status(200).json({
            status: "success",
            message: "Password is updated",
          });
        }
      }
    }
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

module.exports = {
  getUserHandler,
  createUserhandler,
  getuserById,
  updateUserById,
  deleteUserById,
  checkInput,
  forgetPassword,
  resetPassword,
};
