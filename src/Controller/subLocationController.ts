import { Request, Response } from "express";
import { locationfilterationmanager } from "../Manager/subLocationFilterationManager";
import { createResponse } from "../Utility/response";

export const  getFilterRecords= (req: Request, res: Response) => {
    locationfilterationmanager().then(() => {
         return res.status(201).json(createResponse(201, "Success"));
       })
       .catch((err) => {
         return res.status(400).json(createResponse(400, err));
       });
   };



