import Mongoose from "mongoose";
import { Request, Response } from "express";
import { userSchema } from "../model/schema";
import { c2userSchema } from "../model/ce schema";
import { C1userSchema } from "../model/ce1 schema";
import csvtojson from "csvtojson";

const datatest = Mongoose.model("datatest", userSchema);
const cdatatests = Mongoose.model("cdatatests", c2userSchema);
const c1datatests = Mongoose.model("C1dataset", C1userSchema);

export const addata = (req: Request, res: Response) => {
  let collection = new datatest(req.body);
  collection.save((err: any, collect: any) => {
    if (err) {
      res.send(err);
    }
    res.json(collect);
  });
};

export const addc1 = (req: Request, res: Response) => {
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

      c1datatests
        .insertMany(csvData)
        .then(function (data) {
          console.log("Data is inserted");
          res.json(data);
        })
        .catch(function (err) {
          console.log(err);
        });
      c1datatests
        .updateMany({}, { $set: { isprocess: 0 } }, { multi: true })
        .exec();
    });
};

export const addc2 = (req: Request, res: Response) => {
  cdatatests.deleteMany().exec();
  c1datatests
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
      console.log(result);
      result.forEach((i) => {
        cdatatests.insertMany([
          {
            Subscription_Id: i._id.Subscription_Id,
            Resource_Group: i._id.Resource_Group,
            Applicable_Estimated_Charges: i.Applicable_Estimated_Charges,
          },
        ]);
        c1datatests.updateMany({}, { isprocessed: 1 }).exec();
      });
    })
    .catch((error) => {
      console.log(error);
    });
};
