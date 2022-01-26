// const express = require("express");
import express from "express";
import productRoute from "./routes/productRoute.js";
import userRoute from "./routes/userRoute.js";

import errorMiddleware from "./middleware/error.js";

const app = express();

app.use(express.json());

//Products Router
app.use("/api/v1", productRoute);

//user Router
app.use("/api/v1", userRoute);

//middleWare for errors

app.use(errorMiddleware);

export { app };
