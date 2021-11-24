import *as mongoose from "mongoose";
export const c1Schema = new mongoose.Schema({
    customer_Name:{
        type:String
    },
    Customer_Domain:{
        type:String
    },

    Subscription_Id:{
        type:String
    },

    Subscription_Name:{
        type:String
    },
 
    Resource_Location:{
        type:String
    },
 
    Resource_Group:{
        type:String
    },
    
    Consumption_Date:{
        type:String
    },
    
    Meter_Id:{
        type:String
    },
    
    Meter_Name:{
        type:String
    },
    
    Meter_Category:{
        type:String
    },
  
    Meter_Subcategory:{
        type:String
    },
   
    Frequency:{
        type:String
    },
 
    Unit_Of_Measure:{
        type:String
    },

    Unit_Price:{
        type:String
    },

    Quantity:{
        type:String
    },
  
    Applicable_Estimated_Charges:{
        type:String
    },
    isCleaned:{
        type:Number
    }
});

export const rawCollection= mongoose.model('rawCollection',c1Schema)




// CustomerName
// CustomerDomain
// SubscriptionId
// SubscriptionName
// ResourceLocation
// ResourceGroup
// ConsumptionDate
// MeterId
// MeterName
// MeterCategory
// MeterSubcategory
// Frequency
// UnitOfMeasure
// UnitPrice
// Quantity
// ApplicableEstimatedCharges
    