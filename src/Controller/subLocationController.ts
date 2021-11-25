import { Request, Response } from "express";
import { groupByLocation } from "../Manager/subLocationManager";
import { createResponse } from "../Utility/response";

export const  groupByLocationHandler= (req: Request, res: Response) => {
  groupByLocation().then((data) => {
         return res.status(201).json(createResponse(201, data));
       })
       .catch((err) => {
         return res.status(400).json(createResponse(400, err));
       });
   };





