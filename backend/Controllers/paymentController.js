import AsyncErrorHandler from "../utils/asyncError.js";

import stripe from "stripe";
stripe(process.env.STRIPE_SECRET_KEY);
// ;

export const processPayment = AsyncErrorHandler(async (req, res, next) => {
  const myPayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "inr",
    metadata: {
      company: "Ecommerce",
    },
  });

  res
    .status(200)
    .json({ success: true, client_secret: myPayment.client_secret });
});

export const sendStripeApiKey = AsyncErrorHandler(async (req, res, next) => {
  res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
});
