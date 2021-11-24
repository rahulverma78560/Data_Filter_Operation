import { Router } from "express";
import { updateDataHandller } from "../Controller/updateController";
import { postRawdata } from "../Controller/rawDataController";
import { filterData } from "../Controller/subGroupController";
import { deleteController } from "../Controller/deleteController";
import { getFilterRecords } from "../Controller/subLocationController";

const routerMiddleware = Router();

routerMiddleware.post("/rawCollection", postRawdata);

routerMiddleware.post("/group", getFilterRecords);

routerMiddleware.post("/groupCollection", filterData);

routerMiddleware.patch("/updateData/:id", updateDataHandller);

routerMiddleware.delete("/delete", deleteController);

export default routerMiddleware;
