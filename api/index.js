import express from 'express';
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/userRoute.js";
dotenv.config();
async function connectToMongoDB() {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("connected to mongodb");
    } catch (err) {
        console.error(err);
    }
}

connectToMongoDB();
const app = express();

app.listen(3000, () => {
    console.log('Server is running on port 3000!');
    }
)
app.use('/api/user',userRoute);