import express from "express";
import {
  getAllProducts,
  addProducts,
  updateProducts,
  getProductOne,
  deleteProducts,
} from "../Controllers/productsControllers.js";

import { isAuthenticated, AuthorizeRole } from "../middleware/auth.js";

const router = express.Router();

router.route("/products").get(getAllProducts);
router
  .route("/admin/products/new")
  .post(isAuthenticated, AuthorizeRole("admin"), addProducts);

router
  .route("/admin/products/:id")
  .put(isAuthenticated, AuthorizeRole("admin"), updateProducts)

  .delete(isAuthenticated, AuthorizeRole("admin"), deleteProducts);

router.route("/product/:id").get(getProductOne);
export default router;
