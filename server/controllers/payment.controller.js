import Stripe from "stripe";
import User from "../models/user.model.js";
import dotenv from "dotenv";
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = async (req, res) => {
    try {
        const { planId } = req.body;
        const userId = req.userId;

        const plans = {
            plan_500: { amount: 500, credits: 500, name: "500 Credits" },
            plan_1000: { amount: 900, credits: 1000, name: "1000 Credits" },
            plan_2500: { amount: 2000, credits: 2500, name: "2500 Credits" },
        };

        const plan = plans[planId];
        if (!plan) {
            return res.status(400).json({ message: "Invalid plan ID" });
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: plan.name,
                        },
                        unit_amount: plan.amount,
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: `${process.env.CLIENT_URL}/credits?success=true`,
            cancel_url: `${process.env.CLIENT_URL}/credits?canceled=true`,
            metadata: {
                userId: userId.toString(),
                credits: plan.credits.toString(),
            },
        });

        res.json({ id: session.id, url: session.url });
    } catch (error) {
        console.error("Stripe Session Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const stripeWebhook = async (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;

    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        console.error("Webhook Signature Error:", err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === "checkout.session.completed") {
        const session = event.data.object;
        const { userId, credits } = session.metadata;

        try {
            await User.findByIdAndUpdate(userId, {
                $inc: { credits: parseInt(credits) },
            });
            console.log(`Successfully added ${credits} credits to user ${userId}`);
        } catch (error) {
            console.error("Error updating user credits via webhook:", error);
            return res.status(500).json({ message: "Failed to update credits" });
        }
    }

    res.json({ received: true });
};
