import {mongoose} from 'mongoose'
const {Schema} = mongoose

const eventSchema = new Schema({
  eventName: {
    type: String,
    required: [true, "Please provide event name"],
  },

  callback: {
    type: String,
    required: [true, "Please provide callback function"],
  },
  
}, {timestamps:true});

const eventModel = mongoose.model('Event', eventSchema)

export default eventModel

