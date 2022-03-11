// const express = require("express");
import express from "express";
import productRoute from "./routes/productRoute.js";
import userRoute from "./routes/userRoute.js";
import orderRoute from "./routes/orderRoute.js";

import payment from "./routes/paymentRoute";

import fileupload from "express-fileupload";

import errorMiddleware from "./middleware/error.js";
import cookieparser from "cookie-parser";

const app = express();

app.use(express.json());

//Cookie Parser
app.use(cookieparser());

app.use(express.urlencoded({ extended: true }));

app.use(fileupload());

//Products Router
app.use("/api/v1", productRoute);

//user Router
app.use("/api/v1", userRoute);

//Order routes

app.use("/api/v1", orderRoute);

app.use("/api/v1", payment);

//middleWare for errors

app.use(errorMiddleware);

export { app };
