import { locationCollection } from "../model/Subs_Location_Schema";
import { rawCollection } from "../model/Raw_collection_Schema";


export const groupByLocation=async()=>{
    const group=grouplocation().then(async (result) => {
        result.forEach((i) => {
          locationCollection.insertMany([
            {
              Subscription_Id: i._id.Subscription_Id,
              Resource_Location: i._id.Resource_Location,
              Applicable_Estimated_Charges: i.Applicable_Estimated_Charges,
            },
          ]);
          rawCollection.updateMany({}, { isCleaned: 1 }).exec();
        });
      })
      .catch((error) => {
        console.log(error);
      });
      if (!group) {
          return Promise.reject("Data not grouped");
        } else {
          return Promise.resolve("Data Grouped");
        }
}


function grouplocation()
{
    const locationfilter= rawCollection
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
    return locationfilter
}
