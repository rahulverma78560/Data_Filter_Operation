import { Request, Response } from "express";
import { createResponse } from "../Utility/response";
import { updateData } from "../Manager/updateManager";

export const updateDataHandller = async (req: Request, res: Response) => {
  let Data = req.body;
  let id = req.params.id;
  let Applicable_Estimated_Charges = req.body.Applicable_Estimated_Charges;
  updateData(Data, id, Applicable_Estimated_Charges)
    .then((data) => {
      return res.status(200).json(createResponse(200, "Updated Successfully"));
    })
    .catch((err) => {
      return res.status(404).json(createResponse(404, err));
    });
};
