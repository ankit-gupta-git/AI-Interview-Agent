import express from "express";
import { isAuth } from "../middlewares/isAuth.js";
import { analyzeResume, generateQuestions, submitAnswer, finishInterview, getMyInterviews, getInterviewReport } from "../controllers/interview.controller.js";
import upload from "../middlewares/multer.js";

const interviewRouter = express.Router()

interviewRouter.post("/resume", isAuth, upload.single("resume"), analyzeResume)
interviewRouter.post("/generate-questions", isAuth, generateQuestions)
interviewRouter.post("/submit-answer", isAuth, submitAnswer)
interviewRouter.post("/finish-interview", isAuth, finishInterview)

interviewRouter.get("/get-interviews", isAuth, getMyInterviews)
interviewRouter.get("/report/:id", isAuth, getInterviewReport)

export default interviewRouter