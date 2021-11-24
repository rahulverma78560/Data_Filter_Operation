import { Request, Response } from "express";
import { addData } from "../Manager/rawDataManager";
import { createResponse } from "../Utility/response";

export const addDataHandler = (req: Request, res: Response) => {
  addData().then(()=>{
    return res.status(201).json(createResponse(201,"Successfully posted the data"))
  }).catch((err)=>{
    return res.status(400).json(createResponse(400,err))
  })
};


