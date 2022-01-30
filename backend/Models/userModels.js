import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Your Name"],
    minLength: [5, "Name should be longer than 5 characters"],
    maxLength: [30, "Name should not be longer than 30 characters"],
  },
  email: {
    type: String,
    required: [true, "Please Enter Your Email"],
    unique: true,
    validate: [validator.isEmail, "Please Enter Valid Email"],
  },
  password: {
    type: String,
    required: [true, "Please Enter Your Password"],
    select: false,
    minLength: [9, "Password should be greater than 8 characters"],
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: "user",
  },
  resetPassword: String,
  resetPasswordExpire: Date,
});
//Check If Password is Modified or Not Modified & hash the password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

//JWT token

userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_TOKEN, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};
//Checking password is correct or not
userSchema.methods.comparePassword = async function (enteredPassword) {
  const checked = await bcrypt.compare(enteredPassword, this.password);
  return checked;
};

//Generating Token Reset Password

userSchema.methods.getTokenResetPassword = function () {
  //token for resetting Password

  const token = crypto.randomBytes(21).toString("hex");
  // console.log("token:", token);

  //hasing with algorithm
  this.resetPassword = crypto.createHash("sha256").update(token).digest("hex");
  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return token;
};
// console.log(userSchema.methods.getTokenResetPassword());

export default mongoose.model("User", userSchema);
