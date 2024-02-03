const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  confirmPassword: {
    type: String,
    minlength: 8,
    validate: {
      validator: function () {
        return this.password === this.confirmPassword;
      },
      message: "Password and confirm password should be same",
    },
  },
  address: {
    type: String,
    // required: true,
  },
  token:String,
  otpExpiry:Date,
});

/** pre hooks */
userSchema.pre("save",function(){
  this.confirmPassword = undefined;
})
const User = mongoose.model("User", userSchema);

module.exports = User;
