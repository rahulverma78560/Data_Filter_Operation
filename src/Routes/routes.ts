import { Router } from "express";
import { updateDataHandller } from "../Controller/updateController";
import { addDataHandler } from "../Controller/rawDataController";
import { groupDataHandler } from "../Controller/subGroupController";
import { removeDataHandler } from "../Controller/deleteController";
import { groupByLocationHandler } from "../Controller/subLocationController";

const routerMiddleware = Router();

routerMiddleware.post("/rawCollection", addDataHandler);

routerMiddleware.post("/location", groupByLocationHandler);

routerMiddleware.post("/group", groupDataHandler);

routerMiddleware.patch("/updateData/:id", updateDataHandller);

routerMiddleware.delete("/deleteData", removeDataHandler);

export default routerMiddleware;
