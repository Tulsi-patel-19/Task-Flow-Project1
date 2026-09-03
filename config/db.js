import mongoose from "mongoose";
import config from "./config.js";

async function connectDB() {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connect to DB")
}

export default connectDB;