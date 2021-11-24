import { rawCollection } from "../model/Raw_collection_Schema"
export const removeData = async()=>{
    const remove =await rawCollection.deleteMany({"isCleaned":1})
    if(remove.deletedCount===0){
        return Promise.reject("No records Found")
    }
    else{
        return Promise.resolve("Successfully Deleted")
    }
}