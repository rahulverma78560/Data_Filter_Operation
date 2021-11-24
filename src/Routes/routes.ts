import { Router } from "express";
import { updateDataHandller } from "../Controller/updateControllers";
import { postRawdata } from "../Controller/rawDataControllers";
import { filterData } from "../Controller/subGroupFilterationController";
import { deleteController } from "../Controller/deleteControllers";
import { getFilterRecords } from "../Controller/subLocationController";

const routerMiddleware = Router();

routerMiddleware.post("/rawCollection", postRawdata);

routerMiddleware.post("/group", getFilterRecords);

routerMiddleware.post("/groupCollection", filterData);

routerMiddleware.patch("/updateData/:id", updateDataHandller);

routerMiddleware.delete("/delete", deleteController);

export default routerMiddleware;
