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
  getSingleUser,
  updateRoleUpdate,
  deleteUserOnlyAdmin,
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
  .put("/me/update", isAuthenticated, updateProfileOfUser)
  .get("/admin/users", isAuthenticated, AuthorizeRole("admin"), getAllUsers);

router
  .route("/admin/user/:id")
  .get(isAuthenticated, AuthorizeRole("admin"), getSingleUser)
  .delete(isAuthenticated, AuthorizeRole("admin"), deleteUserOnlyAdmin)
  .put(isAuthenticated, AuthorizeRole("admin"), updateRoleUpdate);

export default router;
