import { ErrorHandler } from "../utils/errorHandler.js";

import AsyncErrorHandler from "../utils/asyncError.js";

import jwt from "jsonwebtoken";

import userSchema from "../Models/userModels.js";

export const isAuthenticated = AsyncErrorHandler(async (req, res, next) => {
  const { token } = req.cookies;
  //   console.log("token:", token);
  if (!token) {
    return next(
      new ErrorHandler("Please Login Or sign up to access this resources", 401)
    );
  }
  const decodedData = jwt.verify(token, process.env.JWT_TOKEN);
  req.user = await userSchema.findById(decodedData.id);
  next();
});

export const AuthorizeRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role: ${req.user.role} is not allowed to access this resource `,
          403
        )
      );
    }

    next();
  };
};
