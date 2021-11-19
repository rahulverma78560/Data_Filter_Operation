import { Router } from "express";
import { dataController, deleteController } from "../Controller/controllers";
const routerMiddleWare=Router()
routerMiddleWare.post('/data',dataController)
routerMiddleWare.delete('/delete',deleteController)
export default routerMiddleWare
