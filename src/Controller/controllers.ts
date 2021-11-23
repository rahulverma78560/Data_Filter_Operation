import Mongoose from "mongoose";

import { Request, Response } from "express";
import { userSchema } from "../schema/schema";
import { c2userSchema } from "../model/ce2 schema";
import { C1userSchema } from "../model/ce1 schema";
import csvtojson from "csvtojson";
const datatest = Mongoose.model("datatest", userSchema);
const cdatatests = Mongoose.model("cdatatests", c2userSchema);
const c1datatests=Mongoose.model("C1dataset",C1userSchema)

export const addata = (req: Request, res: Response) => {
  let collection = new datatest(req.body);
  collection.save((err: any, collect: any) => {
    if (err) {
      res.send(err);
    }
    res.json(collect);
  });
};

//            for await (const doc of await aggCursor) {
//             let data=new cdatatests(doc)
//             data.save((err:any,collection:any)=>{
//                 if(err)
//                 {
//                     res.send(err)
//                 }
//                 res.json(collection)
//             })
// }

// for await (const doc of await aggCursor) {
//     console.log("its something different")
//     console.log(doc);

// let data = new cdatatests(elements)
// console.log(data)
// data.insert(elements,(err:any,collection:any)=>{
//     if(err)
//     {
//         res.send(err)
//     }
//     res.json(collection)
// })

// export const getdata = async (req: Request, res: Response) => {
//   const rack = [
//     {
//       $group: {
//         _id: {
//           " SubscriptionID": "$SubscriptionID",
//           resourseLocation: "$resourseLocation",
//         },
//         applicableEstimation: { $sum: "$applicableEstimation" },
//       },
//     },
//   ];
//   const aggCursor = datatest.aggregate(rack);
//   for await (const doc of await aggCursor) {
//     // console.log("its something different")
//     // console.log(doc);
//     for (let i = 0; i < doc.length; i++) {
//       let collection = new cdatatests(doc[i]);
//       collection.save((err: any, collect: any) => {
//         if (err) {
//           res.send(err);
//         }
//         res.json(collect);
//       });
//     }
//   }
// };

// .then (function(){
//     console.log("Data is inserted")
//     console.log(SignatureKind)
// }).catch(function(err){
//     console.log(err)
// })

//     .then(result => {
//         // console.log(result)
//          res.send(result)
//          cdatatests.insertMany([result],{ordered:false}).then(function(){
//              console.log("Data is inserted")
//          }).catch(function(err){
//              console.log(err)
//          })
//       })
//       .catch(error => {
//           console.log(error)
//       })
//   }




export const addc1=(req:Request,res:Response)=>{
   // cron.schedule("*/10 * * * * *", function() {
       c1datatests.deleteMany().exec()
    csvtojson().fromFile("Model-Sample-Data.csv").then(csvData => {
           for(let i=0;i<csvData.length;i++)
           {
               var obj=csvData[i]
               Object.keys(obj).forEach((key) => {
                   var replacedkey=key.trim().replace(/\s+/g,"_");
                    if (key !== replacedkey) {
                        obj[replacedkey] = obj[key];
                        delete obj[key];
                    }
                   });
           }  

        c1datatests.insertMany(
            csvData
            )  .then(function(data){
                console.log("Data is inserted")
                   res.json(data)
                   c1datatests.updateMany({},{$set:{isprocess:0}},{multi:true}).exec()
            }).catch(function(err){
                console.log(err)
          });
       })
    //})
}




export const addc2 = (req: Request, res: Response) => {
    cdatatests.deleteMany().exec()
   c1datatests
    .aggregate([
      {
        $group: {
          _id: {
            Resource_Group: "$Resource_Group",
            Subscription_Id: "$Subscription_Id",
          },
          Applicable_Estimated_Charges:{$sum :{'$toDouble':'$Applicable_Estimated_Charges'}},
        },
      },
    ])
    .then(async (result) => {
        res.json(result)
        console.log(result)
        result.forEach((i) => {
            cdatatests.insertMany([
                {
                    Subscription_Id:i._id.Subscription_Id,
                    Resource_Group:i._id.Resource_Group,
                    Applicable_Estimated_Charges:i.Applicable_Estimated_Charges
                }
            ])
            c1datatests.updateMany({},{isprocess:1}).exec()
        })

    })
    .catch((error) => {
      console.log(error);
    });
};


    
