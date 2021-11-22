import express from "express";
import * as dotenv from "dotenv";
import connectDB from "./Config/db";
import morgan from "morgan";
import chalk from "chalk";
import routerMiddleware from './Routes/routes'


const app = express();
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
connectDB();
dotenv.config();
const PORT = process.env.PORT || 5000;

const jsonParserMiddleware = express.json()

app.use(jsonParserMiddleware)
app.use(routerMiddleware)


app.listen(PORT, () => {
  console.log(
    chalk.yellow.bold(
      `Server is running on ${
        process.env.NODE_ENV || "Production"
      } mode on port ${PORT}`
    )
  );
});
