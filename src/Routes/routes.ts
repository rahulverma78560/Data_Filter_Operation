import { Router } from "express";
import { addData, updateData } from "../Controller/updateControllers";
import { filterData, postRawdata } from "../Controller/rowDataControllers";
import { deleteController } from "../Controller/controllers";
import { getFilterRecords } from "../Controller/filterController";

const routerMiddleware = Router();



routerMiddleware.post("/rawCollection", postRawdata);

routerMiddleware.post("/postData", addData);

routerMiddleware.post("/group", getFilterRecords);

routerMiddleware.post("/groupCollection", filterData);

routerMiddleware.patch("/updateData/:SubscriptionID", updateData);

routerMiddleware.delete("/delete", deleteController);

export default routerMiddleware;
