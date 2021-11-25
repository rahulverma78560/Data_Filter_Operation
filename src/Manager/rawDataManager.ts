import { rawCollection } from "../model/Raw_collection_Schema";
import csvtojson from "csvtojson";

export const addData = () => {
  let add = csvtojson()
    .fromFile(process.env.FILE_PATH || "Model-Sample-Data.csv")
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
      rawCollection
        .insertMany(csvData)
        .then(()=> {
          rawCollection
            .updateMany({}, { $set: { isCleaned: 0 } }, { multi: true })
            .exec();
        })
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
