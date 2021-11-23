import { Data } from "../model/schema";
import { Request, Response } from "express";
import { createResponse } from "../Utility/response";

export const dataController = async (req: Request, res: Response) => {
  let data = new Data(req.body);
  await data.save((err: any) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
};

export const deleteController = async (req: Request, res: Response) => {
  const process = await Data.deleteMany({ isProcessed: 1 });
  if (process.deletedCount === 0)
    return res.status(404).json(createResponse(404, "Document not found"));
  return res.status(200).json(createResponse(200, "Successfully Deleted"));
};
