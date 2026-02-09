import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IPitch extends Document {
    name: string;
    size: '5-a-side' | '7-a-side';
    description: string;
    basePrice: number;
    peakHourPrice: number;
    available: boolean;
    features: string[];
    createdAt: Date;
    updatedAt: Date;
}

const PitchSchema = new Schema<IPitch>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        size: {
            type: String,
            enum: ['5-a-side', '7-a-side'],
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        basePrice: {
            type: Number,
            required: true,
        },
        peakHourPrice: {
            type: Number,
            required: true,
        },
        available: {
            type: Boolean,
            default: true,
        },
        features: {
            type: [String],
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

const Pitch: Model<IPitch> = mongoose.models.Pitch || mongoose.model<IPitch>('Pitch', PitchSchema);

export default Pitch;
