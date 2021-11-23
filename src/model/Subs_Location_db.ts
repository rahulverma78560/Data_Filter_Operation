import *as Mongoose from "mongoose";
const {Schema}=Mongoose
export const c2userSchema = new Schema({
    
        Subscription_Id:{
            type: String,
        },
        Resource_Group:{
        type: String,
        },
        Applicable_Estimated_Charges:{
        type:Number,
    }
});

export const c2filter= Mongoose.model('Subs_location_db',c2userSchema)