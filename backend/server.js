const app = require("./app");
const cloudinary = require("cloudinary");
const connectDatabase = require("./config/database");

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});

// Config
// if (process.env.NODE_ENV !== "production") {
//   require("dotenv").config({ path: "backend/config/config.env" });
// }

// Connecting to database
connectDatabase();

cloudinary.config({
  cloud_name: "dfafurckl",
  api_key: "446876628288614",
  api_secret: "waUAoFUmt2hG_VK3RY0hMX-BE9A",
});

const server = app.listen(process.env.PORT || 4000, () => {
  console.log(
    `Server is working on http://localhost:${process.env.PORT || 4000}`
  );
});

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
});
