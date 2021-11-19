import express from "express";
import * as dotenv from "dotenv";
import connectDB from "./Config/db";
import morgan from "morgan";
import chalk from "chalk";

const PORT = process.env.PORT || 3000;
const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

connectDB();
dotenv.config();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(
    chalk.yellow.bold(
      `Server is running on ${
        process.env.NODE_ENV || "Production"
      } mode on port ${PORT}`
    )
  );
});
