import { Request, Response } from "express";
import { addGroup } from "../Manager/postGroupManager";
import { createResponse } from "../Utility/response";

export const addGroupHandler = (req: Request, res: Response) => {
  addGroup().then(()=>{
    return res.status(201).json(createResponse(201,"Successfully posted the data"))
  }).catch((err)=>{
    return res.status(400).json(createResponse(400,err))
  })
};


