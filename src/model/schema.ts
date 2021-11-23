import *as Mongoose from "mongoose";
const {Schema}=Mongoose
export const userSchema = new Schema({

    customername:{
      type:String,
    },
    customerDomian:{
      type:String
    },
    SubscriptionID: {
        type: String,
    },
    resourseLocation: {
        type: String,
    },
    resourceGroup:{
        type: String,
    },
    Consumptiondate:{
        type:Date
    },
    applicableEstimation:{
        type:Number
    },
    isprocessed:{
        type:Number
    }
});

export const filter= Mongoose.model('testing',userSchema)

