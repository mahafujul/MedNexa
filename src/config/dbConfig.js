import mongoose from "mongoose";

export async function connect() {
  try {
    await mongoose.connect(`${process.env.MONGO_URL}`, { dbName: "med-nexa" });
    console.log("Connection successfully established with MongoDB.");
  } catch (err) {
    console.log("MongoDB connection FAILED: ", err);
  }
}
