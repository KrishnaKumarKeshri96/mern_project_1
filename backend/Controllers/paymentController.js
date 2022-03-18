const catchAsyncErrors = require("../middleware/catchAsyncErrors");

const stripe = require("stripe")(
  "sk_test_51KcFmxSFe2gniihBNxFwKL5NNic8ojqPix1I27iVhHbx7AQk99keAnrTOSpCiVXbYnqmhegtxQazPIxzpm4jlBtW003roVyeiT"
);

exports.processPayment = catchAsyncErrors(async (req, res, next) => {
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

exports.sendStripeApiKey = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({
    stripeApiKey:
      "pk_test_51KcFmxSFe2gniihBYWHQHxGtwhKKcZQHf0ExP9RPThU5f2aDfm0djtCJDCzyJFAYw52Iy0i1fddew1x3aekCXhXI00muUF7sDR",
  });
});
