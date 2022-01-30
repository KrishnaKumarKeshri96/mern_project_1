import express from "express";
import {
  getAllProducts,
  addProducts,
  updateProducts,
  getProductOne,
  deleteProducts,
} from "../Controllers/productsControllers.js";

import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.route("/products").get(isAuthenticated, getAllProducts);
router.route("/products/new").post(addProducts);

router
  .route("/products/:id")
  .put(updateProducts)
  .get(getProductOne)
  .delete(deleteProducts);

export default router;
