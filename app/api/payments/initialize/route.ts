import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Booking from '@/models/Booking';
import { initializeFlutterwavePayment } from '@/lib/payment-providers/flutterwave';
import { createStripePaymentIntent } from '@/lib/payment-providers/stripe';
import { rateLimit } from '@/lib/rate-limit';

// Rate limit: 5 requests per minute
const limiter = rateLimit({
  interval: 60 * 1000,
  maxRequests: 5,
});

export async function POST(request: NextRequest) {
  // Apply rate limiting
  const rateLimitResult = await limiter(request);
  if (rateLimitResult) return rateLimitResult;

  try {
    const body = await request.json();
    const { bookingId, paymentMethod, email, phone, name } = body;

    if (!bookingId || !paymentMethod || !email || !name) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    await connectDB();
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      );
    }

    if (booking.paymentStatus !== 'pending') {
      return NextResponse.json(
        { error: 'Booking already processed' },
        { status: 400 }
      );
    }

    // Check if payment hold has expired
    if (new Date() > booking.paymentHoldExpiresAt) {
      booking.paymentStatus = 'expired';
      await booking.save();
      return NextResponse.json(
        { error: 'Payment hold expired' },
        { status: 400 }
      );
    }

    let result;
    let provider: 'flutterwave' | 'stripe';

    if (paymentMethod === 'momo') {
      if (!phone) {
        return NextResponse.json(
          { error: 'Phone number required for MoMo' },
          { status: 400 }
        );
      }

      provider = 'flutterwave';
      result = await initializeFlutterwavePayment({
        amount: booking.totalPrice,
        currency: 'RWF',
        email,
        phone,
        name,
        bookingId: booking._id.toString(),
        paymentMethod: 'mobilemoneyrwanda',
      });
    } else if (paymentMethod === 'card') {
      provider = 'stripe';
      result = await createStripePaymentIntent({
        amount: booking.totalPrice,
        currency: 'RWF',
        email,
        name,
        bookingId: booking._id.toString(),
      });
    } else {
      return NextResponse.json(
        { error: 'Invalid payment method' },
        { status: 400 }
      );
    }

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      );
    }

    // Update booking with payment details
    booking.paymentProvider = provider;
    booking.paymentTransactionId = result.transactionId;
    await booking.save();

    return NextResponse.json({
      success: true,
      paymentUrl: result.paymentUrl,
      clientSecret: result.clientSecret,
      transactionId: result.transactionId,
      provider,
    });
  } catch (error: any) {
    console.error('Payment initialization error:', error);
    return NextResponse.json(
      { error: 'Failed to initialize payment' },
      { status: 500 }
    );
  }
}
