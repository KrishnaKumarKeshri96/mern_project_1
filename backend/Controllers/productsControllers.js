import productScema from "../Models/productsModel.js";
import { ApiFeatures } from "../utils/apiFeatures.js";
import { ErrorHandler } from "../utils/errorHandler.js";

import AsyncErrorHandler from "../utils/asyncError.js";

//
//get request

const getAllProducts = AsyncErrorHandler(async (req, res) => {
  const productCount = await productScema.countDocuments();
  const apiFeatures = new ApiFeatures(productScema, req.query)
    .search()
    .pagingation(5);
  let response = await apiFeatures.query;

  // apiFeatures.pagingation(5);
  // response = await apiFeatures.query;
  res.status(200).json({
    success: true,
    products: response,
    productCount,
    resultPerPage: 5,
  });
});

//Post request --admin
const addProducts = AsyncErrorHandler(async (req, res) => {
  const productCount = await productScema.countDocuments();
  req.body.user = req.user.id;
  // console.log(req.body);

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

// Create New Review or Update the review
const createProductReview = AsyncErrorHandler(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await productScema.findById(productId);

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );
  // console.log(isReviewed);

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    product.reviews.push(review);
    product.numOfReview = product.reviews.length;
  }

  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.rating = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

// Get All Reviews of a product
const getProductReviews = AsyncErrorHandler(async (req, res, next) => {
  const product = await productScema.findById(req.query.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

// Delete Review
const deleteReview = AsyncErrorHandler(async (req, res, next) => {
  const product = await productScema.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let rating = 0;

  if (reviews.length === 0) {
    rating = 0;
  } else {
    rating = avg / reviews.length;
  }

  const numOfReview = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      rating,
      numOfReview,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});

export {
  getAllProducts,
  addProducts,
  updateProducts,
  getProductOne,
  deleteProducts,
  createProductReview,
  getProductReviews,
  deleteReview,
};
