import productScema from "../Models/productsModel.js";
import { ErrorHandler } from "../utils/errorHandler.js";

//get request
const getAllProducts = async (req, res) => {
  res.status(200).json({ success: true, products: await productScema.find() });
};

//Post request --admin
const addProducts = async (req, res) => {
  const products = await productScema.create(req.body);
  return res.status(201).json({
    success: true,
    products,
  });
};

//put request --admin

const updateProducts = async (req, res, next) => {
  let products = await productScema.findById(req.params.id);
  if (!products) {
    return res
      .status(500)
      .json({ success: false, message: "Product Not Found" });
  }
  products = await productScema.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  return res.status(200).json({ success: true, products });
};

//get one product
const getProductOne = async (req, res, next) => {
  let products = await productScema.findById(req.params.id);
  if (!products) {
    return next(new ErrorHandler("Product not found", 404));
  }
  return res.status(200).json({ success: true, products });
};
const deleteProducts = async (req, res) => {
  let products = await productScema.findById(req.params.id);
  if (!products) {
    return res
      .status(500)
      .json({ success: false, message: "Product Not Found" });
  }
  products.remove();

  return res.status(200).json({ success: true, message: "product deleted" });
};

export {
  getAllProducts,
  addProducts,
  updateProducts,
  getProductOne,
  deleteProducts,
};
