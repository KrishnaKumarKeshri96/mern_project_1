import { ErrorHandler } from "../utils/errorHandler.js";

import AsyncErrorHandler from "../utils/asyncError.js";
import userSchema from "../Models/userModels.js";

import { saveToken } from "../utils/jwtToken.js";

//Register a User

export const registration = AsyncErrorHandler(async (req, res, next) => {
  const user = await userSchema.create({
    ...req.body,
    avatar: { public_id: "test", url: "test" },
  });
  saveToken(user, 201, res);
});

// Login User

export const loginUser = AsyncErrorHandler(async (req, res, next) => {
  const { email, password } = req.body;

  //check If user have given email and password both

  if (!email || !password) {
    return next(new ErrorHandler("Please Enter Email & Password"), 400);
  }

  const user = await userSchema.findOne({ email: email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid Email or Password"), 401);
  }
  const matched = await user.comparePassword(password);
  if (!matched) {
    return next(new ErrorHandler("Invalid Email or Password"), 401);
  }
  saveToken(user, 200, res);
});

//Get all User
export const getAllUsers = AsyncErrorHandler(async (req, res, next) => {
  return res.status(200).json({ success: true, user: await userSchema.find() });
});

//Log Out USer User
export const logout = AsyncErrorHandler(async (req, res, next) => {
  res.cookie("token", null, {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  return res.status(200).json({ success: true, message: "LoggedOut" });
});

//Forgot Password

export const forgotPasswords = AsyncErrorHandler(async (req, res, next) => {
  const user = await userSchema.findOne({ email: req.body.email });

  if (!user) return next(new ErrorHandler("User not found", 404));

  //get Reset password token

  const resetToken = user.getTokenResetPassword();
  await user.save({ validateBeforeSave: false });

  const resetPasswordURL = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/reset/${resetToken}`;

  const message = `Your Password Reset Token is: \n \n ${resetPasswordURL}\n If you have not requested a password reset token. Please Ignore this Mail.`;
});
