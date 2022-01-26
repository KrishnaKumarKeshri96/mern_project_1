import { ErrorHandler } from "../utils/errorHandler.js";

import AsyncErrorHandler from "../utils/asyncError.js";
import userSchema from "../Models/userModels.js";

//Register a User

export const registration = AsyncErrorHandler(async (req, res, next) => {
  const user = await userSchema.create({
    ...req.body,
    avatar: { public_id: "test", url: "test" },
  });
  const token = user.getJWTToken();
  return res.status(201).json({ success: true, token });
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
  const token = user.getJWTToken();
  return res.status(200).json({ success: true, token });
});

export const getAllUsers = AsyncErrorHandler(async (req, res, next) => {
  return res.status(200).json({ success: true, user: await userSchema.find() });
});
