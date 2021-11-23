// import { userSchema } from "../model/schema";
import  * as Mongoose from "mongoose";
import { c2userSchema } from "../model/Subs_Location_db";


import { Request , Response } from "express";

const c3 = Mongoose.model("c3", c2userSchema);

export const addData = (req: Request, res: Response) => {
  let c2Collection = new c3(req.body);

  console.log(c2Collection);
  c2Collection.save((err: any, c2: any) => {
    if (err) {
      res.send(err);
    }
    res.json(c3);
  });
};

export const updateData = (req: Request, res: Response) => {
  c3.findOneAndUpdate(
    { SubscriptionID: req.body.SubscriptionID },
    req.body,
    { new: true },
    (err, c3) => {
      if (err) {
        res.send(err);
      }
      res.json(c3);
    }
  );
};
