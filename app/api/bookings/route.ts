import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Booking from '@/models/Booking';
import Pitch from '@/models/Pitch';
import { format } from 'date-fns';

// Generate a random confirmation code
function generateConfirmationCode(): string {
    return 'SZ-' + Math.random().toString(36).substring(2, 10).toUpperCase();
}

export async function POST(request: NextRequest) {
    try {
        await connectDB();

        const bookingData = await request.json();
        const {
            pitchId,
            date,
            startTime,
            endTime,
            duration,
            totalPrice,
            paymentMethod,
            customerName,
            customerEmail,
            customerPhone,
            notes,
        } = bookingData;

        // Validate required fields
        if (!pitchId || !date || !startTime || !endTime || !customerName || !customerEmail || !customerPhone) {
            return NextResponse.json(
                { error: 'Please provide all required fields' },
                { status: 400 }
            );
        }

        // Check if pitch exists
        const pitch = await Pitch.findById(pitchId);
        if (!pitch) {
            return NextResponse.json(
                { error: 'Pitch not found' },
                { status: 404 }
            );
        }

        // Check for existing bookings at the same time
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

        if (existingBooking) {
            return NextResponse.json(
                { error: 'This time slot is already booked' },
                { status: 400 }
            );
        }

        // Create booking
        const booking = await Booking.create({
            pitch: pitchId,
            date: new Date(date),
            startTime,
            endTime,
            duration,
            totalPrice,
            paymentMethod,
            paymentStatus: 'pending', // Changed from 'completed'
            paymentHoldExpiresAt: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes from now
            confirmationCode: generateConfirmationCode(),
            customerName,
            customerEmail,
            customerPhone,
            notes: notes || '',
        });

        await booking.populate('pitch');

        return NextResponse.json(
            {
                message: 'Booking created successfully',
                booking: {
                    id: booking._id,
                    confirmationCode: booking.confirmationCode,
                    pitch: booking.pitch,
                    date: booking.date,
                    startTime: booking.startTime,
                    endTime: booking.endTime,
                    totalPrice: booking.totalPrice,
                    paymentStatus: booking.paymentStatus,
                },
            },
            { status: 201 }
        );
    } catch (error: any) {
        console.error('Create booking error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function GET(request: NextRequest) {
    try {
        await connectDB();

        const { searchParams } = new URL(request.url);
        const email = searchParams.get('email');

        let query = {};
        if (email) {
            query = { customerEmail: email };
        }

        const bookings = await Booking.find(query)
            .populate('pitch')
            .sort({ date: -1, startTime: -1 });

        return NextResponse.json({ bookings }, { status: 200 });
    } catch (error: any) {
        console.error('Get bookings error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
