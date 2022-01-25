import productScema from "../Models/productsModel.js";
import { ErrorHandler } from "../utils/errorHandler.js";
import { ApiFeatures } from "../utils/apiFeatures.js";

import AsyncErrorHandler from "../utils/asyncError.js";

//get request
const getAllProducts = AsyncErrorHandler(async (req, res) => {
  const productCount = await productScema.countDocuments();
  const apiFeatures = new ApiFeatures(productScema, req.query)
    .search()
    .filter()
    .pagingation(5);

  res.status(200).json({ success: true, products: await apiFeatures.query });
});

//Post request --admin
const addProducts = AsyncErrorHandler(async (req, res) => {
  const products = await productScema.create(req.body);
  return res.status(201).json({
    success: true,
    products,
    productCount,
  });
});

//put request --admin

const updateProducts = AsyncErrorHandler(async (req, res, next) => {
  let products = await productScema.findById(req.params.id);
  if (!products) {
    return next(new ErrorHandler("Product not found", 404));
  }
  products = await productScema.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  return res.status(200).json({ success: true, products });
});

//get one product
const getProductOne = AsyncErrorHandler(async (req, res, next) => {
  let products = await productScema.findById(req.params.id);
  if (!products) {
    return next(new ErrorHandler("Product not found", 404));
  }
  return res.status(200).json({ success: true, products });
});
const deleteProducts = AsyncErrorHandler(async (req, res) => {
  let products = await productScema.findById(req.params.id);
  if (!products) {
    return next(new ErrorHandler("Product not found", 404));
  }
  products.remove();

  return res.status(200).json({ success: true, message: "product deleted" });
});

export {
  getAllProducts,
  addProducts,
  updateProducts,
  getProductOne,
  deleteProducts,
};
