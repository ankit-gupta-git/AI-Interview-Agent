//create server
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDb from "./config/connectDb.js";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import interviewRouter from "./routes/interview.routes.js";
import paymentRouter from "./routes/payment.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true
}));
const PORT = process.env.PORT || 8000;

//middleware
app.use(express.json());
app.use(cookieParser());

//routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/interview", interviewRouter);
app.use("/api/payment", paymentRouter);

app.get("/", (req, res) => {
    res.send("InterviewIQ Server is running...");
});

//listen
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDb();
});