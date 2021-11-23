import { Router } from "express";
import {  updateData } from "../Controller/updateControllers";
import { filterData, postRawdata } from "../Controller/rowDataControllers";
import { deleteController } from "../Controller/controllers";
import { getFilterRecords } from "../Controller/filterController";

const routerMiddleware = Router();

routerMiddleware.post("/groupCollection", filterData);

routerMiddleware.post("/rawCollection", postRawdata);

routerMiddleware.post("/group", getFilterRecords);

routerMiddleware.patch("/updateData/:id", updateData);

routerMiddleware.delete("/delete", deleteController);

export default routerMiddleware;
