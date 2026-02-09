import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IBooking extends Document {
    user: mongoose.Types.ObjectId;
    pitch: mongoose.Types.ObjectId;
    date: Date;
    startTime: string;
    endTime: string;
    duration: number;
    totalPrice: number;
    paymentMethod: 'momo' | 'visa';
    paymentStatus: 'pending' | 'completed' | 'failed';
    confirmationCode: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    notes?: string;
    createdAt: Date;
    updatedAt: Date;
}

const BookingSchema = new Schema<IBooking>(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: false,
        },
        pitch: {
            type: Schema.Types.ObjectId,
            ref: 'Pitch',
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
        startTime: {
            type: String,
            required: true,
        },
        endTime: {
            type: String,
            required: true,
        },
        duration: {
            type: Number,
            required: true,
        },
        totalPrice: {
            type: Number,
            required: true,
        },
        paymentMethod: {
            type: String,
            enum: ['momo', 'visa'],
            required: true,
        },
        paymentStatus: {
            type: String,
            enum: ['pending', 'completed', 'failed', 'cancelled', 'expired'],
            default: 'pending',
            required: true,
        },
        confirmationCode: {
            type: String,
            required: true,
            unique: true,
        },
        customerName: {
            type: String,
            required: true,
        },
        customerEmail: {
            type: String,
            required: true,
        },
        customerPhone: {
            type: String,
            required: true,
        },
        notes: {
            type: String,
        },
        paymentTransactionId: {
            type: String,
            sparse: true,
            index: true,
        },
        paymentProvider: {
            type: String,
            enum: ['flutterwave', 'stripe'],
            required: false,
        },
        paymentVerifiedAt: {
            type: Date,
            required: false,
        },
        paymentHoldExpiresAt: {
            type: Date,
            required: true,
            index: true,
        },
    },
    {
        timestamps: true,
    }
);

// Add compound index for availability queries
BookingSchema.index({ date: 1, paymentStatus: 1 });
BookingSchema.index({ paymentHoldExpiresAt: 1, paymentStatus: 1 });

const Booking: Model<IBooking> = mongoose.models.Booking || mongoose.model<IBooking>('Booking', BookingSchema);

export default Booking;
