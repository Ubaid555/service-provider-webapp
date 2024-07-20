// // import express from 'express';
// // import Stripe from 'stripe';

// // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // Use environment variable for the secret key
// // const router = express.Router();

// // router.post('/create-payment-intent', async (req, res) => {
// //   const { amount } = req.body;

// //   console.log('Received request to create payment intent');
// //   console.log(`Amount: ${amount}`);

// //   try {
// //     const paymentIntent = await stripe.paymentIntents.create({
// //       amount: amount,
// //       currency: 'usd',
// //       payment_method_types: ['card'],
// //     });

// //     console.log('Payment Intent created successfully');
// //     console.log(`Client Secret: ${paymentIntent.client_secret}`);

// //     res.send({
// //       clientSecret: paymentIntent.client_secret,
// //     });
// //   } catch (error) {
// //     console.error('Error creating payment intent:', error);
// //     res.status(500).send({ error: error.message });
// //   }
// // });

// // export default router;

// import express from 'express';
// import Stripe from 'stripe';

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
// const router = express.Router();

// router.post('/create-payment-intent', async (req, res) => {
//   const { amount } = req.body;
//   try {
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: amount,
//       currency: 'usd',
//       payment_method_types: ['card'],
//     });

//     res.send({
//       clientSecret: paymentIntent.client_secret,
//     });
//   } catch (error) {
//     console.error('Error creating payment intent:', error);
//     res.status(500).send({ error: error.message });
//   }
// });

// router.post('/confirm-payment', async (req, res) => {
//   const { paymentIntentId, serviceProviderId, serviceTakerId, amount } = req.body;

//   try {
//     const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

//     if (paymentIntent.status === 'succeeded') {
//       // Transfer logic
//       const transfer = await stripe.transfers.create({
//         amount: Math.floor(amount * 0.98), // Deducting 2% commission
//         currency: 'usd',
//         destination: serviceProviderId, // Service provider's Stripe account ID
//       });

//       res.send({ success: true, transfer });
//     } else {
//       res.status(400).send({ error: 'Payment not completed' });
//     }
//   } catch (error) {
//     console.error('Error confirming payment:', error);
//     res.status(500).send({ error: error.message });
//   }
// });

// export default router;


import express from 'express'
import { addPayment, handleWithdraw, viewBalance, viewPayments, viewWithdrawRequest, withdrawRequest } from '../controller/payment.controller.js';

const router = express.Router();

router.post("/addPayment",addPayment);

router.get("/viewPayment",viewPayments);

router.get("/viewBalance",viewBalance);

router.post("/withdrawRequest",withdrawRequest);

router.get("/viewWithdrawRequest",viewWithdrawRequest);

router.put("/handleWithdraw",handleWithdraw);

export default router;