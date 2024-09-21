import mongoose from "mongoose";

const connection = async () => {
  mongoose.set("strictQuery", true);
  return await mongoose
    .connect(process.env.MONGO_ATLAS)
    .then(() => {
      console.log("connected to database");
    })
    .catch((err) => {
      console.log(err);
      console.log("not connexted");
    });
};
export default connection;
