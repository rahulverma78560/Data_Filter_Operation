import { Request, Response } from "express";
import { createResponse } from "../Utility/response";
import { filter } from "../model/Raw_collection_db";

export const deleteController = async (req: Request, res: Response) => {
  const process = await filter.deleteMany({ isCleaned: 1 });
  if (process.deletedCount === 0)
    return res.status(404).json(createResponse(404, "Document not found"));
  return res.status(200).json(createResponse(200, "Successfully Deleted"));
};
