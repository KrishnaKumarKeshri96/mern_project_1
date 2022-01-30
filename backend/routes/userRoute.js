import {
  registration,
  loginUser,
  getAllUsers,
  logout,
  forgotPassword,
  resetPassword,
} from "../Controllers/UserController.js";
import express from "express";

const router = express.Router();

router
  .post("/register", registration)
  .post("/login", loginUser)
  .get("/getAllUsers", getAllUsers)
  .get("/logout", logout)
  .post("/password/reset", forgotPassword)
  .put("/password/reset/:token", resetPassword);

export default router;
