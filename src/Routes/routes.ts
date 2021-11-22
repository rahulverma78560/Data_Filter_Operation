import { addData, updateData } from "../Controller/controllers";

import {Router} from "express"

const routerMiddleware = Router()

 routerMiddleware.post('/postData', addData)

 routerMiddleware.patch('/updateData/:SubscriptionID', updateData)

 export default routerMiddleware