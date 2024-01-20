const User = require("../models/userModel");

const checkInput = function (req, res, next) {
  console.log("req methid", req.method)
    const userDetails = req.body;
  const isEmpty = Object.keys(userDetails).length === 0;
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
async function getUserHandler(req, res) {
  try {
    // let msg = "";
    // if (userData.length === 0) {
    //   msg = "No user found";
    // } else {
    //   msg = "Data found";
    // }
    const userData = await User.find();
    if (userData.length === 0) {
      throw new Error("No user found");
    } else {
      msg = "Data found";
      res.json({
        status: 200,
        message: msg,
        data: userData,
      });
    }
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: err.message,
    });
  }
}

async function createUserhandler(req, res) {
  try {
    const userDetails = req.body;
    //   const isEmpty = Object.keys(userDetails).length === 0;
    //   if (isEmpty) {
    //     res.status(400).json({
    //       status: 400,
    //       message: "Body cannot be empty",
    //     });
    //   } else {
    // userDetails.id = id;
    console.log("new user", userDetails);
    // userData.push(userDetails);
    // fs.writeFile("./data.json", JSON.stringify(userData), (err) => {
    //   if (err) {
    //     console.log(err);
    //   }
    //   res.json({
    //     status: 200,
    //     message: "User added successfully",
    //     data: userDetails,
    //   });
    // });
    const user = await User.create(userDetails);
    res.status(201).json({
      message: "User created successfully",
      data: user,
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

async function getuserById(req, res) {
  try {
    const { id } = req.params;
    console.log("userid", id);
    // const user = userData.find((user) => user.id === id);
    const user = await User.findById(id);
    if (!user) {
      // res.status(404).json({
      //     status: 404,
      //     message: "User not found",
      //    })
      throw new Error("User not found");
    }
    res.json({
      status: 200,
      message: "User found",
      data: user,
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: err.message,
    });
  }
}

async function updateUserById(req, res) {
  try {
    console.log("request params", req.params);
    const { id } = req.params;
    const updatedUserData = req.body;
    console.log("userid", id);
    const updatedUser = await User.findByIdAndUpdate(id, updatedUserData, {
      new: true,
    });
    console.log("updated user", updatedUser);
    if (!updatedUser) {
      throw new Error("User not found");
    } else {
      res.status(200).json({
        status: 200,
        message: "User updated successfully",
        data: updatedUser,
      });
    }
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: err.message,
    });
  }
}

async function deleteUserById(req, res) {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      throw new Error("User not found");
    } else {
      res.status(200).json({
        status: 200,
        message: "User deleted successfully",
        data: deletedUser,
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
  getUserHandler,
  createUserhandler,
  getuserById,
  updateUserById,
  deleteUserById,
  checkInput,
};
