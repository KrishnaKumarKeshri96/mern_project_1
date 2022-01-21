// const express = require("express");
import express from "express";
import productRoute from "./routes/productRoute.js";

import errorMiddleware from "./middleware/error.js";

const app = express();

app.use(express.json());

app.use("/api/v1", productRoute);

//middleWare for errors

app.use(errorMiddleware);

export { app };
