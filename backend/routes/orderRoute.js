import express from "express";
import { isAuthenticated, AuthorizeRole } from "../middleware/auth.js";

import {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
} from "../controllers/orderController.js";
const router = express.Router();

router.route("/order/new").post(isAuthenticated, newOrder);

router.route("/order/:id").get(isAuthenticated, getSingleOrder);

router.route("/orders/me").get(isAuthenticated, myOrders);

router
  .route("/admin/orders")
  .get(isAuthenticated, AuthorizeRole("admin"), getAllOrders);

router
  .route("/admin/order/:id")
  .put(isAuthenticated, AuthorizeRole("admin"), updateOrder)
  .delete(isAuthenticated, AuthorizeRole("admin"), deleteOrder);

export default router;
