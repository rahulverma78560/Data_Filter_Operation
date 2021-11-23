import * as mongoose from 'mongoose';

const {   Schema } = mongoose;

export const userSchema = new Schema({

    SubscriptionID: {
        type: String,
        
    },
    resourseLocation: {
        type: String,
    },
    IsCleaned: {
        type: Number
    },
  
});




// export default  mongoose.model<{'c3':any, C3Schema: any},{'c2':any, userSchema: any}>
export default  mongoose.model('c2', userSchema);
