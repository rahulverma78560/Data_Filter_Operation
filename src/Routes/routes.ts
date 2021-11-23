import { addData, updateData } from "../Controller/updateControllers";
import { addc1, addc2 } from "../Controller/rowDataControllers";

import { Router } from "express";

const routerMiddleware = Router();
routerMiddleware.post("/addc3", addc2);

routerMiddleware.post("/addc1", addc1);

routerMiddleware.post("/postData", addData);

routerMiddleware.patch("/updateData/:SubscriptionID", updateData);

export default routerMiddleware;
