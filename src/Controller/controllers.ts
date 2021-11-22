import { Request, Response } from "express";
import {col1, col2} from "../model/rLocationSchema";
import { createResponse } from "../Utility/response";

export const getFilterRecords = async (req:Request, res:Response) => {
    await col2.deleteMany({}).exec();
    col1.aggregate([
        { $group: {   // "$SubscriptionID"  "$resourseLocation"
            _id: { SubscriptionID:"$SubscriptionID", resourseLocation:"$resourseLocation"},
            total:{$sum:"$applicableEstimation"} 
        } }
     ])
      .exec()
      .then( (results) => { 
           results.forEach ( 
               (sData) => { 
                col2.insertMany([
                    { 
                        SubscriptionID: sData._id.SubscriptionID, 
                        resourseLocation: sData._id.resourseLocation,
                        totalEstimationPrice: sData.total
                     }             
                ])

                const filter = {
                    SubscriptionID: sData._id.SubscriptionID, 
                    resourseLocation: sData._id.resourseLocation,
                }

                 col1.updateMany(filter, {isCleaned: 1}).exec();
                //  col1.updateMany(filter, {$unset: {isFiltered: 1}}, {multi: true}).exec();
               }
           )
         return res.status(200).json(createResponse(200, "Records Grouped and Save to DB successfully"))
      })
      .catch((err)=> {
          res.status(500).json(createResponse(500, err));
      })

      
} 
  
 

    