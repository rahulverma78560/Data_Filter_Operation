// import { userSchema } from "../model/schema";
import  * as Mongoose from "mongoose";
import { c2filter } from "../model/Subs_Location_db";
import { col2 } from "../model/Subs_group_db";


import { Request , Response } from "express";
import { createResponse } from "../Utility/response";


export const updateData = async(req: Request, res: Response) => {
  let col=await col2.findByIdAndUpdate(req.params.id, {
    Applicable_Estimated_Charges: req.body.Applicable_Estimated_Charges
  },
  {new: true}) || await c2filter.findByIdAndUpdate(req.params.id, {
    Applicable_Estimated_Charges: req.body.Applicable_Estimated_Charges
  },
  {new: true}) ;

  if(!col){
    return res.status(404).json(createResponse(404,"Records not found"))
  }
  res.send(col)
};
