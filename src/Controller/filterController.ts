import { Request, Response } from "express";
// import Mongoose from "mongoose";
import { createResponse } from "../Utility/response";
import { col2 } from "../model/Subs_group_db";
import { filter } from "../model/Raw_collection_db";
// const Raw_collection_db = Mongoose.model("Raw_collection_db", C1userSchema);

export const getFilterRecords = (req: Request, res: Response) => {
  //   col2.deleteMany().exec();
  filter
    .aggregate([
      {
        $group: {
          _id: {
            Resource_Location: "$Resource_Location",
            Subscription_Id: "$Subscription_Id",
          },
          Applicable_Estimated_Charges: {
            $sum: { $toDouble: "$Applicable_Estimated_Charges" },
          },
        },
      },
    ])
    .then(async (result) => {
      res.json(result);
      res.status(200);
      console.log(result);
      result.forEach((i) => {
        col2.insertMany([
          {
            Subscription_Id: i._id.Subscription_Id,
            Resource_Location: i._id.Resource_Location,
            Applicable_Estimated_Charges: i.Applicable_Estimated_Charges,
          },
        ]);
        filter.updateMany({}, { isCleaned: 1 }).exec();
      });
    })
    .catch((error) => {
      console.log(error);
      res.json(500);
    });
};
