import express from "express";
import { getAllProducts } from "../Controllers/productsControllers.js";

const router = express.Router();

router.route("/products").get(getAllProducts);

export default router;
