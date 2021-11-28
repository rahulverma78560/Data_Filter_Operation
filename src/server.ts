import express from "express";
import * as dotenv from "dotenv";
import connectDB from "./Config/db";
import morgan from "morgan";
import chalk from "chalk";
import path from "path";
import { autoPost, autoDelete } from "./Config/jobScheduler";
import routerMiddleware from "./Routes/routes";
import uploadRouter from "./Config/fileUploads";
import { groupCollection } from "./model/Subs_group_Schema";
import fs from "fs"

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

app.get('/', async function (req, res, next) {
  const method = await groupCollection.find();//collection name
var header:any = []
var rows:any = []
var firstRow = true
method.forEach((doc:any) => 
{
    var cells = []
    if (firstRow) header.push("_id")
    cells.push(doc._id.valueOf())
    if (firstRow) header.push("Subscription_Id")
    cells.push(doc.Subscription_Id.valueOf())    
    if (firstRow) header.push("Resource_Group")
    cells.push(doc.Resource_Group.valueOf())   
    if (firstRow) header.push("Applicable_Estimated_Charges",'\n')
    cells.push(doc.Applicable_Estimated_Charges.valueOf())   
    const row:any= cells.join(',')
    rows.push(row)    
    firstRow =  false
}) 
var logger = fs.createWriteStream('todorack.csv', {
flags: 'a' 
})
logger.write(header.join(',')) 
logger.write(rows.join('\n')) 
const fileName = "/todorack.csv"//file path that is written by write stream
res.sendFile(__dirname + fileName,  function (err) {
  if (err) {
    next(err)
  } else {
   // console.log(fileName)
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
