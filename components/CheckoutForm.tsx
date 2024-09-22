"use client";

import { useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useRouter } from 'next/navigation';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) {
      setError('Stripe has not loaded.');
      setProcessing(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      setError(error.message || 'Payment failed');
      setProcessing(false);
      return;
    }

    // Replace this amount with the amount you're charging (in cents)
    const amount = 1000; // Example: $10.00 = 1000 cents

    const response = await fetch('/api/charge', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ paymentMethodId: paymentMethod?.id, amount }),
    });

    const result = await response.json();

    if (result.error) {
      setError(result.error);
    } else {
      setSuccess(true);
      router.push('/?checkout=success'); // Redirect to the homepage or success page
    }

    setProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={processing || !stripe}>
        {processing ? 'Processing...' : 'Pay $10'}
      </button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {success && <div style={{ color: 'green' }}>Payment Successful!</div>}
    </form>
  );
};

export default CheckoutForm;
