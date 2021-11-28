import { Request, Response } from "express";
import { addLocation } from "../Manager/postLocationManager";
import { createResponse } from "../Utility/response";

export const addLocationHandler = (req: Request, res: Response) => {
  addLocation().then(()=>{
    return res.status(201).json(createResponse(201,"Successfully posted the data"))
  }).catch((err)=>{
    return res.status(400).json(createResponse(400,err))
  })
};