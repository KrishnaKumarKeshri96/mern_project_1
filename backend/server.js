import { app } from "./app.js";
import dotenv from "dotenv";
import { database } from "./configs/db.js";

//Handling Uncaught exceptions

process.on("uncaughtException", (err) => {
  console.log("Error:", err.message);
  console.log("Shutting Down Server due  to uncaught exception");
  process.exit(1);
});

dotenv.config({ path: "configs/config.env" });

const server = app.listen(process.env.PORT, async () => {
  await database();
  console.log(`listening on port ${process.env.PORT}`);
});

//Unhandled Promise Rejection

process.on("unhandledRejection", (error) => {
  console.log("Error:", error.message);
  console.log("Shutting Down server due to unhandled Promise rejection");
  server.close(() => {
    process.exit(1);
  });
});
