import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Product Name"],
  },
  description: {
    type: String,
    required: [true, "Pleae Enter Product Description"],
  },
  price: {
    type: Number,
    required: [true, "Please Enter Product Price"],
    maxLength: [6, "price cannot exceed more than 999999"],
  },
});
