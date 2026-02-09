import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Pitch from '@/models/Pitch';

export async function GET(request: NextRequest) {
    try {
        await connectDB();

        const pitches = await Pitch.find({ available: true }).sort({ size: 1 });

        return NextResponse.json({ pitches }, { status: 200 });
    } catch (error: any) {
        console.error('Get pitches error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        await connectDB();

        const pitchData = await request.json();

        const pitch = await Pitch.create(pitchData);

        return NextResponse.json({ pitch }, { status: 201 });
    } catch (error: any) {
        console.error('Create pitch error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
