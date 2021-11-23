import { filter } from "../model/Raw_collection_db"
export const removeData = async()=>{
    const process =await filter.deleteMany({"isCleaned":1})
    if(process.deletedCount===0){
        return Promise.reject("No records Found")
    }
    else{
        return Promise.resolve("Success")
    }
}