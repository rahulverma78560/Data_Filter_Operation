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

export default routerMiddleware;
