import { ErrorHandler } from "../utils/errorHandler.js";

import AsyncErrorHandler from "../utils/asyncError.js";
import userSchema from "../Models/userModels.js";

//Register a User

export const registration = AsyncErrorHandler(async (req, res, next) => {
  const user = await userSchema.create({
    ...req.body,
    avatar: { public_id: "test", url: "test" },
  });
  return res.status(201).json({ success: true, user });
});
