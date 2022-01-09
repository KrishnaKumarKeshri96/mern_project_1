import { app } from "./server.js";
import dotenv from "dotenv";
import { database } from "./configs/db.js";

dotenv.config({ path: "configs/config.env" });

app.listen(process.env.PORT, () => {
  database();
  console.log(`listening on port ${process.env.PORT}`);
});
