import { Request, Response } from "express";
import { groupByLocation, locationresult } from "../Manager/subLocationManager";
import { createResponse } from "../Utility/response";

export const  groupByLocationHandler= (req: Request, res: Response) => {
  locationresult().then((ele)=>{
    res.json(ele)
  })
  groupByLocation().then(() => {
         //return res.status(201).json(createResponse(201, "Successfully grouped the Data"));
       })
       .catch((err) => {
         return res.status(400).json(createResponse(400, err));
       });
   };





