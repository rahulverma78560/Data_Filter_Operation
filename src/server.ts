import express from "express";
import * as dotenv from "dotenv";
import connectDB from "./Config/db";
import morgan from "morgan";
import chalk from "chalk";
import { autoPost, autoDelete } from "./Config/jobScheduler";
import routerMiddleware from "./Routes/routes";

const app = express();
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
const jsonParserMiddleware = express.json();
app.use(jsonParserMiddleware);
app.use(routerMiddleware);
autoPost.start();
autoDelete.start();
connectDB();
dotenv.config();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: __dirname });
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
