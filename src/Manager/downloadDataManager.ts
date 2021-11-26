import { rawCollection } from "../model/Raw_collection_Schema";
import { groupCollection } from "../model/Subs_group_Schema";
import { locationCollection } from "../model/Subs_Location_Schema";
export const getGroup = async (name: string) => {
  if (name.toLowerCase() === "groupdata") {
    const getData = await groupCollection.find();
    return getData;
  } else if (name.toLowerCase() === "locationdata") {
    const getDat = await locationCollection.find();
    return getDat;
  } else if(name.toLowerCase()==="rawcollection"){
    const getData = await rawCollection.find();
    return getData;
  }else {
    return "Invalid Input";
  }
};
