const express = require("express");
const authRouter = express.Router();

const {
  forgetPassword,
  resetPassword,
  loginHandler,
  signUpHandler,
    logoutHandler
} = require("../controllers/authController");
const { checkInput } = require("../utils/crudFactory");

/** routes for authentication */
authRouter.post("/signup", checkInput, signUpHandler);
authRouter.post("/login", loginHandler);
authRouter.post("/forgetPassword", forgetPassword);
authRouter.patch("/resetPassword/:userId", resetPassword);
authRouter.get('/logout', logoutHandler);

module.exports = authRouter;
