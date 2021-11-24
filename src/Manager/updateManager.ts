import { locationCollection } from "../model/Subs_Location_Schema";
import { groupCollection } from "../model/Subs_group_Schema";

export const updateData = async(Data:any, id:string, Applicable_Estimated_Charges:number)=>{
    if(!Applicable_Estimated_Charges){
        return Promise.reject("Cannot Modify the requested field")
      }
      let update=await locationCollection.findByIdAndUpdate(id, {
        Applicable_Estimated_Charges: Data.Applicable_Estimated_Charges
      },
      {new: true})  || await groupCollection.findByIdAndUpdate(id, {
        Applicable_Estimated_Charges: Data.Applicable_Estimated_Charges
      },
      {new: true})
    if(!update){
        return Promise.reject('Data not Updated')
    }
    else{
        return Promise.resolve("Updated Successfully")
    }
}

