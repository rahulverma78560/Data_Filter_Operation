import *as mongoose from "mongoose";
export const c2Schema = new mongoose.Schema({
    
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

export const groupCollection= mongoose.model('groupCollection',c2Schema)