import { col2 } from "../model/Subs_group_db";
import { filter } from "../model/Raw_collection_db";


export const locationfilterationmanager=async()=>{
    const filterresult=grouplocation().then(async (result) => {
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
      });
      if (!filterresult) {
          return Promise.reject("Data not updated");
        } else {
          return Promise.resolve("Data Posted");
        }
}


function grouplocation()
{
    const locationfilter= filter
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
