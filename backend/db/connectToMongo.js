import mongoose from "mongoose";

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("Connected to mongoDB");
  } catch (error) {
    console.log("error connectinf to mongoDb: ", error.message);
  }
};

export default connectToMongoDB;
