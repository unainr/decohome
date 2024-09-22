import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { paymentMethodId } = req.body;

      const paymentIntent = await stripe.paymentIntents.create({
        amount: 5000, // amount in cents
        currency: 'usd',
        payment_method: paymentMethodId,
        confirm: true,
      });

      res.status(200).json({ success: true, paymentIntent });
    } catch (error: unknown) {
      if (error instanceof Error) {
        // Now you can safely access the message property
        res.status(500).json({ error: error.message });
      } else {
        // If error is not an instance of Error, handle accordingly
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
    
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
