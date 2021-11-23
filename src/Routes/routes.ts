import { Router } from "express";
import { addData, updateData } from "../Controller/updateControllers";
import { addc1, addc2 } from "../Controller/rowDataControllers";
import { dataController, deleteController } from "../Controller/controllers";
import { getFilterRecords } from "../Controller/filterController";

const routerMiddleware = Router();

routerMiddleware.post("/addc3", addc2);

routerMiddleware.post("/addc1", addc1);

routerMiddleware.post("/postData", addData);

routerMiddleware.post("/group", getFilterRecords);

routerMiddleware.patch("/updateData/:SubscriptionID", updateData);

routerMiddleware.post("/data", dataController);

routerMiddleware.delete("/delete", deleteController);

export default routerMiddleware;
