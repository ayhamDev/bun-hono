import * as mongoose from "mongoose";
const connectDB = async (defualtAdmin = true) => {
  try {
    if (Bun.env.MONGO_URI !== undefined) {
      const conn = await mongoose.connect(Bun.env.MONGO_URI, {
        minPoolSize: 10,
        maxPoolSize: 500,
      });
      return null;
    }
  } catch (err: any) {
    process.exit(1);
  }
};

export default connectDB;
