import { Request, Response } from "express";
import { createResponse } from "../Utility/response";
import { getGroup } from "../Manager/downloadDataManager";
export const downloadDataHandler = async (req: Request, res: Response) => {
  const name = req.params.name;
  getGroup(name)
    .then((getData) => {
      return res.status(200).json(createResponse(200, getData));
    })
    .catch((err) => {
      return res.status(404).json(createResponse(404, err));
    });
};
