import express from "express";
import * as dotenv from "dotenv";
import connectDB from "./Config/db";
import morgan from "morgan";
import chalk from "chalk";
import routerMiddleWare from "./Routes/routes"
const jsonParserMiddleWare=express.json()
const app = express();
app.use(jsonParserMiddleWare);
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
connectDB();
dotenv.config();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.setHeader('X-Foo', 'bar')
  res.send("Hello World!");
});

app.use(routerMiddleWare)
app.listen(PORT, () => {
  console.log(
    chalk.yellow.bold(
      `Server is running on port ${
        process.env.NODE_ENV || "Production"
      } mode on port ${PORT}`
    )
  );
});
