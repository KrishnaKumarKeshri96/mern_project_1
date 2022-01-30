import {
  registration,
  loginUser,
  getAllUsers,
  logout,
} from "../Controllers/UserController.js";
import express from "express";

const router = express.Router();

router
  .post("/register", registration)
  .post("/login", loginUser)
  .get("/getAllUsers", getAllUsers)
  .get("/logout", logout);

export default router;
