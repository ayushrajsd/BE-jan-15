const express = require("express");
userRouter = express.Router();
const {
  getUserHandler,
  createUserhandler,
  getuserById,
  updateUserById,
  deleteUserById,
  checkInput,
  forgetPassword,
  resetPassword
} = require("../controllers/userController");

/** original path for get users looked like /api/users/ */
userRouter.get("/",getUserHandler)
userRouter.post("/",checkInput,createUserhandler)
userRouter.get("/:id",getuserById)
userRouter.patch("/:id",updateUserById)
userRouter.delete("/:id",deleteUserById)
userRouter.post("/forgetPassword",forgetPassword)
userRouter.patch("/resetPassword/:userId",resetPassword)

module.exports = userRouter;