import express from "express";
import { createCheckoutSession, stripeWebhook } from "../controllers/payment.controller.js";
import { isAuth } from "../middlewares/isAuth.js";

const paymentRouter = express.Router();

paymentRouter.post("/create-checkout-session", isAuth, createCheckoutSession);
paymentRouter.post("/webhook", express.raw({ type: "application/json" }), stripeWebhook);

export default paymentRouter;
