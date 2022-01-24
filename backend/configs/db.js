import mongoose from "mongoose";

export const database = () => {
  mongoose
    .connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then((success) => {
      console.log("db runnig on " + success.connection.host);
    });
};
