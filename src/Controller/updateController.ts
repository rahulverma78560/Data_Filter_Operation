import { Request, Response } from "express";
import { createResponse } from "../Utility/response";
import { updateData } from "../Manager/updateManager";

export const updateDataHandller = async (req: Request, res: Response) => {
  let Data = req.body;
  let id = req.params.id;
  let Applicable_Estimated_Charges = req.body.Applicable_Estimated_Charges;
  if(!Applicable_Estimated_Charges){
    return res.status(400).json(createResponse(400, "Cannot modify the requested field"));
  }
  updateData(Data, id, Applicable_Estimated_Charges)
    .then((data) => {
      return res.status(201).json(createResponse(201, "Data Updated Successfully"));
    })
    .catch((err) => {
      return res.status(400).json(createResponse(400, err="Invalid Id"));
    });
};
