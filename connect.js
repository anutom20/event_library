// connect to MongoDB


import {mongoose} from 'mongoose'
import dotenv from "dotenv"
dotenv.config()

mongoose.set("strictQuery", false);
// connect to MongoDB

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: true,
    });
    console.log("DB connected!");
  } catch (error) {
    console.log(error);
  }
};

export default connectDB

















