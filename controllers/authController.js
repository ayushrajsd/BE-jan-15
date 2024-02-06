const User = require("../models/userModel");
const { emailBuilder } = require("../nodemailer");
const jwt = require("jsonwebtoken");

const SECRET_KEY = "SomeRandomKery@12321";

// app.post("/signup", signUpHandler);
// app.post("/login", loginHandler);

const protectRoute = async function (req, res, next) {
  try {
    const { token } = req.cookies;
    const decoded = jwt.verify(token, SECRET_KEY);
    console.log("decoded", decoded);
    //   const user = await User.findById(decoded.data);
    if (decoded) {
      const userId = decoded.data;
      req.userId = userId; // manipulating request object
      next();
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: "invalid token",
    });
  }
};

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

const isAdmin = async (req, res, next) => {
  const userId = req.userId;
  const user = await User.findById(userId);
  if (user.role === "admin") {
    next();
  } else {
    res.status(401).json({
      status: "failed to authenticate",
      message: "You are not authorized to access this route",
    });
  }
};

async function signUpHandler(req, res) {
  try {
    const userObject = req.body;
    console.log("userObject", userObject);
    const user = await User.create(userObject);
    res.json({
      message: "user created",
      user,
    });
  } catch (err) {
    console.log(err);
  }
}

async function loginHandler(req, res) {
  // validate credentials
  // send token
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    console.log("user", user);
    if (!user) {
      res.status(400).json({
        message: "user not found",
      });
    } else {
      if (user.password === password) {
        const token = jwt.sign({ data: user._id }, SECRET_KEY);
        res.cookie("token", token, {
          maxAge: 1000 * 60 * 60 * 24,
          httpOnly: true,
        });
        res.json({
          message: "login successfull",
          data: user,
        });
      } else {
        res.status(400).json({
          message: "invalid credentials",
        });
      }
    }
  } catch (err) {
    console.log(err);
  }
}
const isAuthorized = function (allowedRoles) {
  return async function (req, res, next) {
    const userId = req.userId;
    console.log("userId", userId);
    const user = await User.findById(userId);
    if (allowedRoles.includes(user.role)) {
      next();
    } else {
      res.status(401).json({
        message: "You are not authorized to access this route",
      });
    }
  };
};

const logoutHandler =  (req, res) => {
    res.clearCookie("token");
    res.status(200).json({
        message: "user logged out",
    });
}

module.exports = {
  forgetPassword,
  resetPassword,
  protectRoute,
  loginHandler,
  signUpHandler,
  isAdmin,
    isAuthorized,
    logoutHandler
};
