import mongoose from "mongoose";

// ------ colletion 1  (get records) ---------
const cl1 = new mongoose.Schema({ 
    isCleaned: {type: Number}
});
export let col1 = mongoose.model("db1", cl1);

// -----Collection 2 (insert records)-------------
const cl2 = new mongoose.Schema({
    SubscriptionID: { type: String },
    resourseLocation: { type: String },
    applicableEstimation: { type: Number },
});
export let col2 = mongoose.model("db2", cl2);



