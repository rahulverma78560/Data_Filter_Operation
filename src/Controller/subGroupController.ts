import { Request, Response } from "express";
import { filteration } from "../Manager/subGoupFilterationManager";
import { createResponse } from "../Utility/response";

export const filterData = (req: Request, res: Response) => {
  filteration()
    .then(() => {
      return res.status(201).json(createResponse(201, "Success"));
    })
    .catch((err) => {
      return res.status(400).json(createResponse(400, err));
    });
};
