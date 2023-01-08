import { mongoose } from "mongoose";
const { Schema } = mongoose;


const triggerSchema = new Schema({
  eventName: {
    type: String,
    required: [true, "Please provide event name"],
  },
  
},{
    timestamps:{
        createdAt : true,
        updatedAt : false
    }
});

const triggerModel = mongoose.model('Trigger', triggerSchema)

export default triggerModel