import { rawCollection } from "../model/Raw_collection_Schema";
import { groupCollection } from "../model/Subs_group_Schema";
const converter = require('json-2-csv');
const path = require('path');
const fs=require('fs');
export const groupData=async()=>{
  let data =await aggregateData().exec()
    const group=aggregateData().then(async (result) => {
            result.forEach((i) => {
              groupCollection.insertMany([
             {
               Subscription_Id: i._id.Subscription_Id,
               Resource_Group: i._id.Resource_Group,
               Applicable_Estimated_Charges: i.Applicable_Estimated_Charges,
             },
           ]);
           rawCollection.updateMany({}, { isCleaned: 1 }).exec();
         });
       }).catch((error) => {
         console.log(error)
       });
       if (!group) {
           return Promise.reject("Data not Grouped");
         } else {
           return Promise.resolve(data);
         }
   }
  
   function aggregateData(){
    const dataFiltering=rawCollection
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
       return dataFiltering
   }

  