import { filter } from "../model/Raw_collection_db";
import { c2filter } from "../model/Subs_group_db";


export const filteration=async()=>{
    const groupData=aggregateData().then(async (result) => {
            result.forEach((i) => {
           c2filter.insertMany([
             {
               Subscription_Id: i._id.Subscription_Id,
               Resource_Group: i._id.Resource_Group,
               Applicable_Estimated_Charges: i.Applicable_Estimated_Charges,
             },
           ]);
           filter.updateMany({}, { isCleaned: 1 }).exec();
         });
       }).catch((error) => {
         console.log(error)
       });
       if (!groupData) {
           return Promise.reject("Data not updated");
         } else {
           return Promise.resolve("Data Posted");
         }
   }
   

   
  
   function aggregateData(){
    const dataFiltering=filter
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