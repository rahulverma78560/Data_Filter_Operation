import mongoose from "mongoose";
const cl2 = new mongoose.Schema({
    Subscription_Id: { type: String },
    Resource_Location: { type: String },
    Applicable_Estimated_Charges: { type: Number },
});
export let col2 = mongoose.model(" Subs_group_db", cl2);



