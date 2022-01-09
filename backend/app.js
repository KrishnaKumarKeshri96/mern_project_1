import { app } from "./server.js";
import dotenv from "dotenv";
dotenv.config({ path: "configs/config.env" });

app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
});
