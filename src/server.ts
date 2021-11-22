import express from "express";
import * as dotenv from "dotenv";
import connectDB from "./Config/db";
import morgan from "morgan";
import chalk from "chalk";

import router from "./Routes/routes";

connectDB();
dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/", router);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(
    chalk.yellow.bold(
      `Server is running on port ${process.env.NODE_ENV} mode on port ${PORT}`
    )
  );
});
