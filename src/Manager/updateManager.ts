import { col2 } from "../model/Subs_group_db";
import { c2filter } from "../model/Subs_Location_db";

export const updateData = async(Data:any, id:string, Applicable_Estimated_Charges:number)=>{
    if(!Applicable_Estimated_Charges){
        return Promise.reject("Cannot Modify")
      }
      let col=await col2.findByIdAndUpdate(id, {
        Applicable_Estimated_Charges: Data.Applicable_Estimated_Charges
      },
      {new: true})  || await c2filter.findByIdAndUpdate(id, {
        Applicable_Estimated_Charges: Data.Applicable_Estimated_Charges
      },
      {new: true})
    if(!col){
        return Promise.reject('Record Not Found')
    }
    else{
        return Promise.resolve("Updated Successfully")
    }
}

