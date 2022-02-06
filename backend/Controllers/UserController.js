import { ErrorHandler } from "../utils/errorHandler.js";

import AsyncErrorHandler from "../utils/asyncError.js";
import userSchema from "../Models/userModels.js";

import { saveToken } from "../utils/jwtToken.js";

import { sendEmail } from "../utils/sendEmail.js";

import crypto from "crypto";

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

//Log Out USer User
export const logout = AsyncErrorHandler(async (req, res, next) => {
  res.cookie("token", null, {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  return res.status(200).json({ success: true, message: "LoggedOut" });
});

//Forgot Password

export const forgotPassword = AsyncErrorHandler(async (req, res, next) => {
  const user = await userSchema.findOne({ email: req.body.email });

  if (!user) return next(new ErrorHandler("User not found", 404));

  //get Reset password token

  const resetToken = user.getTokenResetPassword();
  await user.save({ validateBeforeSave: false });

  const resetPasswordURL = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/reset/${resetToken}`;

  const message = `Your Password Reset Token is: \n \n ${resetPasswordURL}\n\n If you have not requested a password reset token. Please Ignore this Mail.`;

  try {
    await sendEmail({
      email: user.email,
      subject: `Reset Your Password`,
      message,
    });

    return res.status(200).json({
      success: true,
      message: `Email Sent to ${user.email} successfully.`,
    });
  } catch (err) {
    user.resetPassword = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(err.message, 500));
  }
});

export const resetPassword = AsyncErrorHandler(async (req, res, next) => {
  //creating TokenHAsh
  const resetPassword = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await userSchema.findOne({
    resetPassword,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    return next(new ErrorHandler("Requested URL is Invalid or Expired", 400));
  }
  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password is Not Same", 400));
  }
  if (req.body.confirmPassword.length <= 8) {
    return next(
      new ErrorHandler("Password should be greater than 8 character", 400)
    );
  }

  user.password = req.body.confirmPassword;
  user.resetPassword = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();
  saveToken(user, 200, res);
});

//Gets Current Users Detail

export const getCurrentUser = AsyncErrorHandler(async (req, res, next) => {
  // console.log(req.user, req.token);
  // const user = await userSchema.findById(req.user.id);

  res.status(200).json({ success: true, user: req.user });
});

//update Password
export const updatePasswordOfUser = AsyncErrorHandler(
  async (req, res, next) => {
    const user = await (
      await userSchema.findById(req.user.id)
    ).select("+password");

    const matched = await user.comparePassword(req.body.oldPassword);
    if (!matched) {
      return next(new ErrorHandler("Old Password is incorrect"), 400);
    }
    if (req.body.newPassword !== req.body.confirmPassword)
      return next(new ErrorHandler("Password Doesnot Matched"), 400);

    user.password = req.body.confirmPassword;
    await user.save();

    saveToken(user, 200, res);
  }
);

//update user Profile
export const updateProfileOfUser = AsyncErrorHandler(async (req, res, next) => {
  const newUserData = {
    email: req.body.email,
    name: req.body.name,
  };
  const user = await userSchema.findByIdAndUpdate(req.body.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({ success: true });
});

//Get all User (admin)
export const getAllUsers = AsyncErrorHandler(async (req, res, next) => {
  return res.status(200).json({ success: true, user: await userSchema.find() });
});

//Get Single User (admin)
export const getSingleUser = AsyncErrorHandler(async (req, res, next) => {
  const user = await userSchema.findById(req.params.id);
  if (!user) return next(new ErrorHandler("User Doesn't exist", 400));
  return res.status(200).json({ success: true, user });
});

//Update User Role --Admin

export const updateRoleUpdate = AsyncErrorHandler(async (req, res, next) => {
  const newUserData = {
    email: req.body.email,
    name: req.body.name,
    role: req.body.role,
  };
  const user = await userSchema.findById(req.params.id);
  if (!user) return next(new ErrorHandler("User Doesn't exist", 400));

  await user.update(newUserData, {
    new: true,
    useFindAndModify: false,
    runValidators: true,
  });

  res.status(200).json({ success: true });
});

// Delete User --Admin
export const deleteUserOnlyAdmin = AsyncErrorHandler(async (req, res, next) => {
  const user = await userSchema.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User does not exist with Id: ${req.params.id}`, 400)
    );
  }

  await user.remove();

  res.status(200).json({
    success: true,
    message: "User Deleted Successfully",
  });
});
