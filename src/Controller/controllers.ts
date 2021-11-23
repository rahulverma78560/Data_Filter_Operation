import { Request, Response } from "express";
import {col1, col2} from "../model/rLocationSchema";
import { createResponse } from "../Utility/response";


export const getFilterRecords = async (req:Request, res:Response) => {
    await col2.deleteMany({}).exec();
    
    let total = 0;
    col1.aggregate([
        { $group: {   // "$Subscription_ID"  "$Resource_Location"
            _id: { Subscription_Id:"$Subscription_Id", Resource_Location:"$Resource_Location" },
            Applicable_Estimated_Charges: { $sum: {$toDouble: '$Applicable_Estimated_Charges' } } 
        } }
     ])
      .exec()
      .then( (results) => { 
           results.forEach ( 
               (sData) => { console.log(sData.Applicable_Estimate)
                col2.insertMany([
                    { 
                        Subscription_Id: sData._id.Subscription_Id, 
                        Resource_Location: sData._id.Resource_Location,
                        Applicable_Estimated_Charges: sData.Applicable_Estimated_Charges
                     }             
                ])

                const filter = {
                    Subscription_ID: sData._id.Subscription_ID, 
                    Resource_Location: sData._id.Resource_Location,
                }

                 col1.updateMany(filter, {isCleaned : 1}).exec();
                
               }
           )
         return res.status(200).json(createResponse(200, "Records Grouped and Save to DB successfully"))
      })
      .catch((err)=> {
          res.status(500).json(createResponse(500, err));
      })
}

 
