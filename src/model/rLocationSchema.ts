import mongoose from "mongoose";

// ------ colletion 1  (get records) ---------
const cl1 = new mongoose.Schema({ 
    isCleaned: {type: Number}
});
export let col1 = mongoose.model("c1datasets", cl1);

// -----Collection 2 (insert records)-------------
const cl2 = new mongoose.Schema({
    Subscription_Id: { type: String },
    Resource_Location: { type: String },
    Applicable_Estimated_Charges: { type: Number },
});
export let col2 = mongoose.model("testings", cl2);



