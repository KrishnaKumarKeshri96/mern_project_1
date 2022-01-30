// const express = require("express");
import express from "express";
import productRoute from "./routes/productRoute.js";
import userRoute from "./routes/userRoute.js";

import errorMiddleware from "./middleware/error.js";
import cookieparser from "cookie-parser";

const app = express();

app.use(express.json());

//Cookie Parser
app.use(cookieparser());

//Products Router
app.use("/api/v1", productRoute);

//user Router
app.use("/api/v1", userRoute);

//middleWare for errors

app.use(errorMiddleware);

export { app };
