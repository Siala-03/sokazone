// Script to seed initial pitch data into MongoDB
// Run with: node scripts/seed-pitches.js

const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

const pitchSchema = new mongoose.Schema({
    name: String,
    size: String,
    description: String,
    basePrice: Number,
    peakHourPrice: Number,
    available: Boolean,
    features: [String],
}, { timestamps: true });

const Pitch = mongoose.models.Pitch || mongoose.model('Pitch', pitchSchema);

const pitches = [
    {
        name: 'Main 5-a-side Pitch',
        size: '5-a-side',
        description: 'Our premium 5-a-side pitch with professional artificial turf, perfect for quick and intense games.',
        basePrice: 30000,
        peakHourPrice: 50000,
        available: true,
        features: [
            'Professional artificial turf',
            'Floodlighting',
            'Changing rooms',
            'Seating area',
            'Water fountain'
        ],
    },
    {
        name: 'Main 7-a-side Pitch',
        size: '7-a-side',
        description: 'Spacious 7-a-side pitch ideal for tactical play and larger teams.',
        basePrice: 40000,
        peakHourPrice: 60000,
        available: true,
        features: [
            'Professional artificial turf',
            'Floodlighting',
            'Changing rooms',
            'Seating area',
            'Water fountain',
            'Larger playing area'
        ],
    },
];

async function seedPitches() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Clear existing pitches
        await Pitch.deleteMany({});
        console.log('Cleared existing pitches');

        // Insert new pitches
        const result = await Pitch.insertMany(pitches);
        console.log(`Successfully seeded ${result.length} pitches:`);
        result.forEach(pitch => {
            console.log(`  - ${pitch.name} (${pitch.size})`);
        });

        await mongoose.connection.close();
        console.log('\nDatabase connection closed');
        console.log('✅ Seeding complete!');
    } catch (error) {
        console.error('Error seeding pitches:', error);
        process.exit(1);
    }
}

seedPitches();
