import mongoose from "mongoose";
const c3Schema = new mongoose.Schema({
    Subscription_Id: { type: String },
    Resource_Location: { type: String },
    Applicable_Estimated_Charges: { type: Number },
});
export let locationCollection = mongoose.model(" locationCollection", c3Schema);



