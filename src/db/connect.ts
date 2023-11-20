import mongoose from "mongoose";

const connectDB = async (url: string) => {
  return await mongoose
    .connect(url)
    .then(() => {
      console.log("database connected");
    })
    .catch((error: any) => {
      console.log(error);
    });
};

export default connectDB;
