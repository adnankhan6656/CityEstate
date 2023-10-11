import express from 'express';
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/userRoute.js";
import authRouter from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
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
app.use(express.json());
app.use(cookieParser());


app.listen(3000, () => {
    console.log('Server is running on port 3000!');
    }
)
app.use('/api/user',userRoute);
app.use('/api/auth', authRouter);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
  });