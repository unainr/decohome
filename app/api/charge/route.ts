import Stripe from 'stripe';
import { NextResponse } from 'next/server'; // Import Next.js response helper

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

// The new API route handler for Next.js 13/14 in the app directory
export async function POST(req: Request) {
  try {
    const { paymentMethodId } = await req.json(); // Parse the JSON from the request body

    const paymentIntent = await stripe.paymentIntents.create({
      amount: 5000, // amount in cents
      currency: 'usd',
      payment_method: paymentMethodId,
      confirm: true,
    });

    return NextResponse.json({ success: true, paymentIntent }, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
    }
  }
}
