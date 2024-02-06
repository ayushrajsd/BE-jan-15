const express = require("express");
const userRouter = express.Router();
const {
  getUserHandler,
  createUserhandler,
  getuserById,
  updateUserById,
  deleteUserById,
  checkInput,
 
} = require("../controllers/userController");

const {
  forgetPassword,
  resetPassword,
  protectRoute,
  isAdmin,
  loginHandler,
  signUpHandler
} = require("../controllers/authController")

userRouter.use(protectRoute)

/** original path for get users looked like /api/users/ */
userRouter.get("/", isAdmin, getUserHandler) // user data is returned only for admins
// userRouter.post("/",checkInput,signUpHandler)
// userRouter.post("/login",loginHandler)
userRouter.get("/:id",getuserById)
userRouter.patch("/:id",updateUserById)
userRouter.delete("/:id",deleteUserById)
// userRouter.post("/forgetPassword",forgetPassword)
// userRouter.patch("/resetPassword/:userId",resetPassword)

module.exports = userRouter;