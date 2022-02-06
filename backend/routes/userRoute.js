import {
  registration,
  loginUser,
  getAllUsers,
  logout,
  forgotPassword,
  resetPassword,
  getCurrentUser,
  updatePasswordOfUser,
  updateProfileOfUser,
} from "../Controllers/UserController.js";
import express from "express";
import { isAuthenticated, AuthorizeRole } from "../middleware/auth.js";

const router = express.Router();

router
  .post("/register", registration)
  .post("/login", loginUser)
  .get("/getAllUsers", getAllUsers)
  .get("/logout", logout)
  .post("/password/reset", forgotPassword)
  .put("/password/reset/:token", resetPassword)
  .get("/me", isAuthenticated, getCurrentUser)
  .put("/password/update", isAuthenticated, updatePasswordOfUser)
  .put("/me/update", isAuthenticated, updateProfileOfUser);

export default router;
