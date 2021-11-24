import { Request, Response } from "express";
import { sendData } from "../Manager/rawDataManager";
import { createResponse } from "../Utility/response";

export const postRawdata = (req: Request, res: Response) => {
  sendData().then(()=>{
    return res.status(201).json(createResponse(201,"Success"))
  }).catch((err)=>{
    return res.status(400).json(createResponse(400,err))
  })
};


