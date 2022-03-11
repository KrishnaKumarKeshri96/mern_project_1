import express from "express";
import {
  processPayment,
  sendStripeApiKey,
} from "../controllers/paymentController";
const router = express.Router();
import { isAuthenticated } from "../middleware/auth.js";

router.route("/payment/process").post(isAuthenticated, processPayment);

router.route("/stripeapikey").get(isAuthenticated, sendStripeApiKey);

export default router;
