import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Booking from '@/models/Booking';
import { verifyFlutterwaveWebhook } from '@/lib/payment-providers/flutterwave';
import { verifyStripeWebhook } from '@/lib/payment-providers/stripe';

export async function POST(request: NextRequest) {
  const provider = request.nextUrl.searchParams.get('provider');

  if (!provider || !['flutterwave', 'stripe'].includes(provider)) {
    return NextResponse.json({ error: 'Invalid provider' }, { status: 400 });
  }

  try {
    await connectDB();

    if (provider === 'flutterwave') {
      const signature = request.headers.get('verif-hash');
      const payload = await request.json();

      if (!signature || !verifyFlutterwaveWebhook(signature)) {
        console.error('Flutterwave webhook signature verification failed');
        return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
      }

      if (payload.event === 'charge.completed' && payload.data.status === 'successful') {
        const bookingId = payload.data.meta.booking_id;
        const booking = await Booking.findById(bookingId);

        if (booking && booking.paymentStatus === 'pending') {
          booking.paymentStatus = 'completed';
          booking.paymentVerifiedAt = new Date();
          await booking.save();
        }
      }
    } else if (provider === 'stripe') {
      const signature = request.headers.get('stripe-signature');
      const body = await request.text();

      if (!signature) {
        return NextResponse.json({ error: 'No signature' }, { status: 401 });
      }

      const event = verifyStripeWebhook(body, signature);

      if (!event) {
        return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
      }

      if (event.type === 'payment_intent.succeeded') {
        const paymentIntent = event.data.object as any;
        const bookingId = paymentIntent.metadata.booking_id;
        const booking = await Booking.findById(bookingId);

        if (booking && booking.paymentStatus === 'pending') {
          booking.paymentStatus = 'completed';
          booking.paymentVerifiedAt = new Date();
          await booking.save();
        }
      }
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
