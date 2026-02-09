import Stripe from 'stripe';

let stripe: Stripe | null = null;

function getStripeClient() {
  if (!stripe) {
    const secretKey = process.env.STRIPE_SECRET_KEY;

    if (!secretKey) {
      throw new Error('Stripe credentials not configured');
    }

    stripe = new Stripe(secretKey, {
      apiVersion: '2025-02-24.acacia',
    });
  }
  return stripe;
}

export interface StripePaymentParams {
  amount: number;
  currency: string;
  email: string;
  name: string;
  bookingId: string;
}

export async function createStripePaymentIntent(params: StripePaymentParams) {
  try {
    const stripeClient = getStripeClient();
    const paymentIntent = await stripeClient.paymentIntents.create({
      amount: Math.round(params.amount * 100), // Convert to cents
      currency: params.currency.toLowerCase(),
      receipt_email: params.email,
      metadata: {
        booking_id: params.bookingId,
        customer_name: params.name,
      },
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return {
      success: true,
      clientSecret: paymentIntent.client_secret,
      transactionId: paymentIntent.id,
    };
  } catch (error: any) {
    console.error('Stripe payment intent error:', error);
    return {
      success: false,
      error: error.message || 'Payment initialization failed',
    };
  }
}

export async function verifyStripePayment(paymentIntentId: string) {
  try {
    const stripeClient = getStripeClient();
    const paymentIntent = await stripeClient.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status === 'succeeded') {
      return {
        success: true,
        verified: true,
        transactionId: paymentIntent.id,
        amount: paymentIntent.amount / 100,
        bookingId: paymentIntent.metadata.booking_id,
      };
    }

    return { success: true, verified: false, status: paymentIntent.status };
  } catch (error: any) {
    console.error('Stripe verification error:', error);
    return { success: false, error: error.message };
  }
}

export function verifyStripeWebhook(
  payload: string | Buffer,
  signature: string
): Stripe.Event | null {
  try {
    const stripeClient = getStripeClient();
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!webhookSecret) {
      throw new Error('Stripe webhook secret not configured');
    }

    return stripeClient.webhooks.constructEvent(
      payload,
      signature,
      webhookSecret
    );
  } catch (error) {
    console.error('Stripe webhook verification failed:', error);
    return null;
  }
}
