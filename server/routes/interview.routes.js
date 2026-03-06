import express from "express";
import { isAuth } from "../middlewares/isAuth.js";
import { analyzeResume, generateQuestions, submitAnswer, finishInterview } from "../controllers/interview.controller.js";
import upload from "../middlewares/multer.js";

const interviewRouter = express.Router()

interviewRouter.post("/resume", isAuth, upload.single("resume"), analyzeResume)
interviewRouter.post("/generate-questions", isAuth, generateQuestions)
interviewRouter.post("/submit-answer", isAuth, submitAnswer)
interviewRouter.post("/finish-interview", isAuth, finishInterview)

export default interviewRouter