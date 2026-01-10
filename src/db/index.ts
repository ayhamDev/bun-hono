import * as mongoose from "mongoose";
const connectDB = async (defualtAdmin = true) => {
  try {
    if (process.env.MONGO_URI !== undefined) {
      const conn = await mongoose.connect(process.env.MONGO_URI, {
        minPoolSize: 0,
        maxIdleTimeMS: 10000, // Closes idle connections after 10 seconds
      });
      console.log("connected to databse");

      return null;
    }
  } catch (err: any) {
    console.log(err);

    process.exit(1);
  }
};

export default connectDB;
