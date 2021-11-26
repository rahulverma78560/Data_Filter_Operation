import { Router } from "express";
import { updateDataHandller } from "../Controller/updateController";
import { addDataHandler } from "../Controller/rawDataController";
import { groupDataHandler } from "../Controller/subGroupController";
import { removeDataHandler } from "../Controller/deleteController";
import { groupByLocationHandler } from "../Controller/subLocationController";
import { downloadDataHandler } from "../Controller/downloadDataController";

const routerMiddleware = Router();

routerMiddleware.post("/rawCollection", addDataHandler);

routerMiddleware.get("/location", groupByLocationHandler);

routerMiddleware.get("/group", groupDataHandler);

routerMiddleware.get("/:name", downloadDataHandler);

routerMiddleware.patch("/updateData/:id", updateDataHandller);

routerMiddleware.delete("/deleteData", removeDataHandler);

//routerMiddleware.get('/file',downloadcollection);

export default routerMiddleware;



// function (req, res, next) {
//     const fileName = "C:/Users/Raksith Ballal M/Desktop/freshpull/Data_Filter_Operation/public/todos.csv"
//     res.sendFile(fileName, function (err) {
//       if (err) {
//         next(err)
//       } else {
//         console.log(fileName)
//       }
//     })
//   })