import { NextRequest, NextResponse } from 'next/server';
import { getBulkAvailability, expireOldPendingBookings } from '@/lib/booking-utils';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const startDateStr = request.nextUrl.searchParams.get('startDate');
    const endDateStr = request.nextUrl.searchParams.get('endDate');

    if (!startDateStr || !endDateStr) {
      return NextResponse.json(
        { error: 'Missing date parameters' },
        { status: 400 }
      );
    }

    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      return NextResponse.json(
        { error: 'Invalid date format' },
        { status: 400 }
      );
    }

    // Expire old pending bookings first
    await expireOldPendingBookings();

    const availability = await getBulkAvailability(startDate, endDate);

    return NextResponse.json({
      availability: Object.fromEntries(availability),
    });
  } catch (error: any) {
    console.error('Bulk availability error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch availability' },
      { status: 500 }
    );
  }
}
