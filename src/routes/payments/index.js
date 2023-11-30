var express = require("express");
const Payment = require("../../modals/Payment");
var router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

router.get('/payments/:email', async (req, res) => {
    const email = req.params.email;
    const query = { email: email };
    const result = await Payment.find(query);
    res.send(result);
})

//payment intent(done)
router.post("/create-payment-intent", async (req, res) => {
    const { salary } = req.body;
    const amount = parseInt(salary * 100);
    const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: "usd",
        payment_method_types: ['card']
    });

    res.send({
        clientSecret: paymentIntent.client_secret
    })
})


//payments(done)
router.post("/payments", async (req, res) => {
    const payment = new Payment(req.body);

    const existingPayment = await Payment.findOne({
        email: payment.email,
        monthYear: payment.monthYear,
    });

    if (existingPayment) {
        return res.status(400).send({ message: 'Payment already processed for this month and year.' });
    }
    const paymentResult = await payment.save();
    res.send(paymentResult);
})

module.exports = router