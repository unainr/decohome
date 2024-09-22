import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialize Stripe with the secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

export async function POST(req: Request) {
  try {
    const { cartItems } = await req.json();
    const lineItems = cartItems.map((item: any) => {
      const imageUrl = new URL(item.productimg, process.env.NEXT_PUBLIC_DOMAIN).href;
      console.log("Product Image URL: ", imageUrl); // Log the image URL
      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.productname,
            images: [imageUrl], // Ensure the image URL is correct
          },
          unit_amount: item.price * 100, // Stripe expects amount in cents
        },
        quantity: item.quantity,
      };
    });

    // Create a Stripe checkout session
    const session: any = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_DOMAIN}/?checkout=success`, // Redirect to home with success
      cancel_url: `${process.env.NEXT_PUBLIC_DOMAIN}/?checkout=cancel`, // Redirect to home with cancel
    });

    // Return session URL for redirecting to Stripe Checkout
    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error('Stripe error:', err);
    return NextResponse.json({ error: 'Failed to create Stripe session' }, { status: 500 });
  }
}
