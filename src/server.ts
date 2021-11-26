import express from "express";
import * as dotenv from "dotenv";
import connectDB from "./Config/db";
import morgan from "morgan";
import chalk from "chalk";
import path from "path";
import { autoPost, autoDelete } from "./Config/jobScheduler";
import routerMiddleware from "./Routes/routes";
import uploadRouter from "./Config/fileUploads";

const app = express();
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
const jsonParserMiddleware = express.json();
app.use(jsonParserMiddleware);
app.use(routerMiddleware);
app.use(uploadRouter);
autoPost.start();
autoDelete.start();
connectDB();
dotenv.config();
const PORT = process.env.PORT || 3000;

app.get('/', function (req, res, next) {
  
  const fileName = "C:/Users/Raksith Ballal M/Desktop/freshpull/Data_Filter_Operation/uploads/todo.csv"
  res.sendFile(fileName,  function (err) {
    if (err) {
      next(err)
    } else {
      console.log(fileName)
    }
  })
})

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.listen(PORT, () => {
  console.log(
    chalk.yellow.bold(
      `Server is running on ${
        process.env.NODE_ENV || "Production"
      } mode on port ${PORT}`
    )
  );
});
