import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import { getCookie, setCookie } from "cookies-next";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const apiRoute = nextConnect<NextApiRequest, NextApiResponse>({
  onError(error, req, res) {
    res.status(501).json({
      error: `Sorry something Happened! ${error.message}`,
    });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method "${req.method}" Not Allowed` });
  },
});

apiRoute.post(async (req, res) => {
  try {
    const { price, userDetails } = req.body;
    const totalCartPriceCalc = price ? price * 100 : 0;
    const totalCartPrice =
      Math.round((totalCartPriceCalc + Number.EPSILON) * 100) / 100;

    const paymentIntentID_Old = getCookie("paymentIntent_id", { req, res });

    if (paymentIntentID_Old) {
      // Create a PaymentIntent with the order amount and currency
      const paymentIntentUpdated = await stripe.paymentIntents.update(
        paymentIntentID_Old,
        {
          amount: totalCartPrice,
        }
      );
      return res.send({
        clientSecret: paymentIntentUpdated.client_secret,
        paymentIntentID: paymentIntentUpdated.id,
      });
    } else {
      // check if customer exists
      const customer = await stripe.customers.create({
        description: "Metajobs Customer",
        name: userDetails?.name?.firstName + " " + userDetails?.name?.lastName,
        email: userDetails?.email,
        phone: userDetails?.phone,
      });

      // Create a PaymentIntent with the order amount and currency
      const paymentIntent = await stripe.paymentIntents.create({
        amount: totalCartPrice,
        currency: "usd",
        customer: customer?.id,
        setup_future_usage: "off_session",
        automatic_payment_methods: {
          enabled: true,
        },
      });
      // set paymentIntent id in local storage
      setCookie("paymentIntent_id", paymentIntent.id, { req, res });

      return res.send({
        clientSecret: paymentIntent.client_secret,
        paymentIntentID: paymentIntent.id,
      });
    }
  } catch (error) {
    return res.status(500).send({
      message: "Server Error",
      error: error,
    });
  }
});

export default apiRoute;
