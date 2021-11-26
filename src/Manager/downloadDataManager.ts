import { groupCollection } from "../model/Subs_group_Schema";
import { locationCollection } from "../model/Subs_Location_Schema";

export const getGroup = async (name: string) => {
  if (name.toLowerCase() === "groupdata") {
    const getData = await groupCollection.find();
    return getData;
  } else if (name.toLowerCase() === "locationdata") {
    const getDat = await locationCollection.find();
    return getDat;
  } else {
    return "Invalid Input";
  }
};


