import express from "express";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js"
import projectRoutes from "./routes/projectRoutes.js"
// import dotenv, { config } from "dotenv";



const app = express();
const port = 3000;
app.use(express.json())

app.use("/api/auth",authRoutes);

app.use("/api/projects",projectRoutes)

connectDB();

app.listen(port ,()=>{
    console.log("server is running on port 3000");
})

