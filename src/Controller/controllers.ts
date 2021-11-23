import { Request,Response } from "express";
import { createResponse } from "../Utility/response";
import { removeData } from "../Manager/deleteManager";

export const deleteController=async(req:Request,res:Response)=>{
    removeData()
    .then(() => {
            res.status(200).json(createResponse(200,'Successfully Deleted the Data'))
        }
    ).catch((err)=>{
            res.status(404).json(createResponse(404,err));
    })
 }