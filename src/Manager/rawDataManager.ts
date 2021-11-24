import { filter } from "../model/Raw_collection_db";
import csvtojson from "csvtojson";

export const sendData = () => {
  let success = csvtojson()
    .fromFile("Model-Sample-Data.csv")
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
      filter
        .insertMany(csvData)
        .then(function () {
          filter
            .updateMany({}, { $set: { isCleaned: 0 } }, { multi: true })
            .exec();
        })
        .catch(function (err) {
          console.log(err);
        });
    });
  if (!success) {
    return Promise.reject("Data not updated");
  } else {
    return Promise.resolve("Data Posted");
  }
};