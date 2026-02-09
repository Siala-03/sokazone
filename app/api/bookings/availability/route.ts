import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Booking from '@/models/Booking';
import { getAvailableSlots, expireOldPendingBookings } from '@/lib/booking-utils';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const { pitchId, date, startTime, endTime } = await request.json();

    if (!pitchId || !date || !startTime || !endTime) {
      return NextResponse.json(
        { error: 'Please provide all required fields' },
        { status: 400 }
      );
    }

    // Check for existing bookings
    const existingBooking = await Booking.findOne({
      pitch: pitchId,
      date: new Date(date),
      $or: [
        { startTime: { $lte: startTime }, endTime: { $gt: startTime } },
        { startTime: { $lt: endTime }, endTime: { $gte: endTime } },
        { startTime: { $gte: startTime }, endTime: { $lte: endTime } },
      ],
      paymentStatus: { $ne: 'failed' },
    });

    return NextResponse.json(
      { available: !existingBooking },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Check availability error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const dateStr = request.nextUrl.searchParams.get('date');
    const durationStr = request.nextUrl.searchParams.get('duration');

    if (!dateStr || !durationStr) {
      return NextResponse.json(
        { error: 'Missing parameters' },
        { status: 400 }
      );
    }

    const date = new Date(dateStr);
    const duration = parseInt(durationStr);

    if (isNaN(date.getTime()) || ![2, 3].includes(duration)) {
      return NextResponse.json(
        { error: 'Invalid parameters' },
        { status: 400 }
      );
    }

    // Expire old pending bookings first
    await expireOldPendingBookings();

    const slots = await getAvailableSlots(date, duration);

    return NextResponse.json({ slots });
  } catch (error: any) {
    console.error('Availability error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch availability' },
      { status: 500 }
    );
  }
}
