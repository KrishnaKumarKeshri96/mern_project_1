import { registration } from "../Controllers/UserController.js";
import express from "express";

const router = express.Router();

router.post("/register", registration);

export default router;
