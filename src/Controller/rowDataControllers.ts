import Mongoose from "mongoose";
import { Request, Response } from "express";
import { c2userSchema } from "../model/Subs_Location_db";
import { C1userSchema } from "../model/Raw_collection_db";
import csvtojson from "csvtojson";
const Subs_Location_db = Mongoose.model("Subs_Location_db", c2userSchema);
const Raw_collection_db = Mongoose.model("Raw_collection_db", C1userSchema);

export const postRawdata = (req: Request, res: Response) => {
  Raw_collection_db.deleteMany().exec();
  csvtojson()
    .fromFile("Model-Sample-Data.csv")
    .then((csvData) => {
      for (let i = 0; i < csvData.length; i++) {
        let obj = csvData[i];
        Object.keys(obj).forEach((key) => {
          let replacedkey = key.trim().replace(/\s+/g, "_");
          if (key !== replacedkey) {
            obj[replacedkey] = obj[key];
            delete obj[key];
          }
        });
      }

      Raw_collection_db
        .insertMany(csvData)
        .then(function (data) {
          console.log("Data is inserted");
          res.json(data);
          Raw_collection_db
            .updateMany({}, { $set: {  isCleaned: 0 } }, { multi: true })
            .exec();
        })
        .catch(function (err) {
          console.log(err);
        });
    });
};

export const filterData = (req: Request, res: Response) => {
  Subs_Location_db.deleteMany().exec();
  Raw_collection_db
    .aggregate([
      {
        $group: {
          _id: {
            Resource_Group: "$Resource_Group",
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
      res.json(200)
      console.log(result);
      result.forEach((i) => {
        Subs_Location_db.insertMany([
          {
            Subscription_Id: i._id.Subscription_Id,
            Resource_Group: i._id.Resource_Group,
            Applicable_Estimated_Charges: i.Applicable_Estimated_Charges,
          },
        ]);
        Raw_collection_db.updateMany({}, {  isCleaned: 1 }).exec();
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500)
    });
};
