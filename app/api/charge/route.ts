import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { paymentMethodId, amount } = req.body;

    try {
      // Create a payment intent on the server
      const paymentIntent = await stripe.paymentIntents.create({
        amount, // Pass the amount from the client-side (in cents, e.g., 1000 = $10)
        currency: 'usd',
        payment_method: paymentMethodId,
        confirm: true, // Automatically confirm the payment
      });

      res.status(200).json({ success: true, paymentIntent });
    } catch (error) {
      res.status(400).json({ error: (error as any).message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
