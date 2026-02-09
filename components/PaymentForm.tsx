'use client';

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface PaymentFormProps {
  bookingId: string;
  amount: number;
  customerEmail: string;
  customerName: string;
  onSuccess: () => void;
  onError: (error: string) => void;
}

function MoMoPaymentForm({ bookingId, amount, customerEmail, customerName, onSuccess, onError }: PaymentFormProps) {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!phone.match(/^(?:07[238])\d{7}$/)) {
      onError('Invalid Rwanda phone number. Format: 072XXXXXXX, 073XXXXXXX, or 078XXXXXXX');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/payments/initialize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookingId,
          paymentMethod: 'momo',
          email: customerEmail,
          phone,
          name: customerName,
        }),
      });

      const data = await response.json();

      if (data.success) {
        window.location.href = data.paymentUrl;
      } else {
        onError(data.error || 'Payment initialization failed');
      }
    } catch (error) {
      onError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">
          Mobile Money Number
        </label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="07XXXXXXXX"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
          required
        />
        <p className="text-sm text-gray-500 mt-1">
          MTN, Airtel-Tigo (Rwanda)
        </p>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50"
      >
        {loading ? 'Processing...' : `Pay RWF ${amount.toLocaleString()}`}
      </button>
    </form>
  );
}

function CardPaymentForm({ bookingId, amount, customerEmail, customerName, onSuccess, onError }: PaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setLoading(true);

    try {
      const response = await fetch('/api/payments/initialize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookingId,
          paymentMethod: 'card',
          email: customerEmail,
          name: customerName,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        onError(data.error || 'Payment initialization failed');
        setLoading(false);
        return;
      }

      const { clientSecret } = data;
      const cardElement = elements.getElement(CardElement);

      if (!cardElement) {
        onError('Card element not found');
        setLoading(false);
        return;
      }

      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: customerName,
            email: customerEmail,
          },
        },
      });

      if (error) {
        onError(error.message || 'Payment failed');
      } else if (paymentIntent.status === 'succeeded') {
        onSuccess();
      }
    } catch (error) {
      onError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">
          Card Details
        </label>
        <div className="border rounded-lg p-3">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
            }}
          />
        </div>
      </div>
      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Processing...' : `Pay RWF ${amount.toLocaleString()}`}
      </button>
    </form>
  );
}

export default function PaymentForm(props: PaymentFormProps & { paymentMethod: 'momo' | 'card' }) {
  if (props.paymentMethod === 'momo') {
    return <MoMoPaymentForm {...props} />;
  }

  return (
    <Elements stripe={stripePromise}>
      <CardPaymentForm {...props} />
    </Elements>
  );
}
