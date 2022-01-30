import { ErrorHandler } from "../utils/errorHandler.js";
export default (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  //MongoDb Id Error

  if (err.name === "CastError") {
    const message = `Resources not found. Invalid: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  //Mongoose Duplicate Key Error
  if (err.code == 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(message, 400);
  }

  //Wrong JWT Error
  if (err.name == "JsonWebTokenError") {
    const message = `Json Web Token is Invalid`;
    err = new ErrorHandler(message, 400);
  }

  //JWT Expires Error
  if (err.name == "TokenExpiredError") {
    const message = `Json Web Token is Expired`;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,

    message: err.message,
  });
};
