import {
  registration,
  loginUser,
  getAllUsers,
} from "../Controllers/UserController.js";
import express from "express";

const router = express.Router();

router
  .post("/register", registration)
  .post("/login", loginUser)
  .get("/getAllUsers", getAllUsers);

export default router;
