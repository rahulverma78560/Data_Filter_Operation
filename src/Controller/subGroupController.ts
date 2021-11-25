import { Request, Response } from "express";
import { groupData} from "../Manager/subGroupManager";
import { createResponse } from "../Utility/response";

export const groupDataHandler = (req: Request, res: Response) => {
      groupData().then((data) => {
     return res.status(201).json(createResponse(201, data));
    })
    .catch((err) => {
      return res.status(400).json(createResponse(400, err));
    });
};
