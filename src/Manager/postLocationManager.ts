import { locationCollection } from './../model/Subs_Location_Schema';
import csvtojson from "csvtojson";

export const addLocation = () => {
  let add = csvtojson()
    .fromFile("uploads/data.csv")
    .then((csvData) => {
      for (let i = 0; i < csvData.length; i++) {
        let obj = csvData[i];
        Object.keys(obj).forEach((key) => {
          let replacedkey = key.trim().replace(/\s+/g, "_");
          if (key !== replacedkey) {
            obj[replacedkey] = obj[key];
            delete obj[key];
          }
        });
      }
      locationCollection.deleteMany().exec()
      locationCollection
        .insertMany(csvData)
        .catch((err)=> {
          console.log(err);
        });
    });
  if (!add) {
    return Promise.reject("Data not Posted");
  } else {
    return Promise.resolve("Data Posted");
  }
};
