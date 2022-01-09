// const express = require("express");
import express from "express";
import productRoute from "./routes/productRoute.js";

const app = express();

app.use(express.json());

app.use("/api/v1", productRoute);

export { app };
