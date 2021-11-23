import express from "express";
import * as dotenv from "dotenv";
import connectDB from "./Config/db";
import morgan from "morgan";
import chalk from "chalk";
import { addc1, addc2 } from "./Controller/controllers";
import job from "./Config/jobScheduler";

const app = express();
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const jsonParserMiddleware = express.json();
app.use(jsonParserMiddleware);
app.post("/addc3", addc2);
app.post("/addc1", addc1);

job.start();
connectDB();
dotenv.config();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(
    chalk.yellow.bold(
      `Server is running on ${
        process.env.NODE_ENV || "Production"
      } mode on port ${PORT}`
    )
  );
});
