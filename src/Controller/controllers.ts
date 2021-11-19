import { Data} from "../model/schema";
import { Request,Response } from "express";
export const dataController= async(req:Request,res:Response)=>{
    let data= new Data(req.body);
    await data.save((err:any)=>{
        if(err){
            res.send(err)
        }else{
            res.send(data)
        }
      }
   )
}

export const deleteController=async(req:Request,res:Response)=>{
    try{  const process =await Data.deleteMany({"isProcessed":1})
       if(process.deletedCount===0) 
          return res.status(404).json("Documents not found") 
   return res.status(200).json("Successfully Deleted")
}
    catch(e){
        console.log(e)
    }
 }