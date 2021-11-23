import  mongoose  from "mongoose"

export const dataSchema= new mongoose.Schema({
    subscriptionId:{type:String,required:true },
    resourceLocation:{type:String,required:true},
    isProcessed:{type:Number,required:true}
})

export const Data=mongoose.model('Data',dataSchema)
