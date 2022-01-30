import {
  registration,
  loginUser,
  getAllUsers,
  logout,
  forgotPassword,
} from "../Controllers/UserController.js";
import express from "express";

const router = express.Router();

router
  .post("/register", registration)
  .post("/login", loginUser)
  .get("/getAllUsers", getAllUsers)
  .get("/logout", logout)
  .post("/password/reset", forgotPassword);

export default router;
