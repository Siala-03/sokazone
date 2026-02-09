import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Booking from '@/models/Booking';
import { verifyFlutterwavePayment } from '@/lib/payment-providers/flutterwave';
import { verifyStripePayment } from '@/lib/payment-providers/stripe';
import { rateLimit } from '@/lib/rate-limit';

// Rate limit: 10 requests per minute
const limiter = rateLimit({
  interval: 60 * 1000,
  maxRequests: 10,
});

export async function GET(request: NextRequest) {
  // Apply rate limiting
  const rateLimitResult = await limiter(request);
  if (rateLimitResult) return rateLimitResult;

  try {
    const bookingId = request.nextUrl.searchParams.get('bookingId');
    const transactionId = request.nextUrl.searchParams.get('transactionId');

    if (!bookingId) {
      return NextResponse.json({ error: 'Missing bookingId' }, { status: 400 });
    }

    await connectDB();
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    // If already completed, return success
    if (booking.paymentStatus === 'completed') {
      return NextResponse.json({
        status: 'completed',
        verified: true,
        booking,
      });
    }

    // Check if expired
    if (new Date() > booking.paymentHoldExpiresAt) {
      booking.paymentStatus = 'expired';
      await booking.save();
      return NextResponse.json({
        status: 'expired',
        verified: false,
      });
    }

    // Verify with payment provider if transactionId provided
    if (transactionId) {
      let result;
      
      if (booking.paymentProvider === 'flutterwave') {
        result = await verifyFlutterwavePayment(transactionId);
      } else if (booking.paymentProvider === 'stripe') {
        result = await verifyStripePayment(transactionId);
      }

      if (result?.success && result.verified) {
        booking.paymentStatus = 'completed';
        booking.paymentVerifiedAt = new Date();
        await booking.save();

        return NextResponse.json({
          status: 'completed',
          verified: true,
          booking,
        });
      }
    }

    return NextResponse.json({
      status: booking.paymentStatus,
      verified: false,
    });
  } catch (error: any) {
    console.error('Payment verification error:', error);
    return NextResponse.json(
      { error: 'Verification failed' },
      { status: 500 }
    );
  }
}
