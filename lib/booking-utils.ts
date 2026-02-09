import connectDB from './mongodb';
import Booking from '@/models/Booking';

export interface TimeSlot {
  startTime: string;
  endTime: string;
  available: boolean;
}

export async function getAvailableSlots(
  date: Date,
  duration: number
): Promise<TimeSlot[]> {
  await connectDB();
  
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);
  
  // Get all non-expired bookings for this date
  const bookings = await Booking.find({
    date: { $gte: startOfDay, $lte: endOfDay },
    paymentStatus: { $nin: ['failed', 'cancelled', 'expired'] },
    $or: [
      { paymentStatus: 'completed' },
      { 
        paymentStatus: 'pending',
        paymentHoldExpiresAt: { $gt: new Date() }
      }
    ]
  }).select('startTime endTime duration');

  const slots: TimeSlot[] = [];
  const startHour = 6; // 6 AM
  const endHour = 22; // 10 PM
  
  for (let hour = startHour; hour <= endHour - duration; hour++) {
    const startTime = `${hour.toString().padStart(2, '0')}:00`;
    const endTime = `${(hour + duration).toString().padStart(2, '0')}:00`;
    
    const isAvailable = !bookings.some(booking => {
      const bookingStart = parseInt(booking.startTime.split(':')[0]);
      const bookingEnd = bookingStart + booking.duration;
      
      return (
        (hour >= bookingStart && hour < bookingEnd) ||
        (hour + duration > bookingStart && hour + duration <= bookingEnd) ||
        (hour <= bookingStart && hour + duration >= bookingEnd)
      );
    });
    
    slots.push({ startTime, endTime, available: isAvailable });
  }
  
  return slots;
}

export async function getBulkAvailability(
  startDate: Date,
  endDate: Date
): Promise<Map<string, boolean>> {
  await connectDB();
  
  const bookings = await Booking.find({
    date: { $gte: startDate, $lte: endDate },
    paymentStatus: { $nin: ['failed', 'cancelled', 'expired'] },
    $or: [
      { paymentStatus: 'completed' },
      { 
        paymentStatus: 'pending',
        paymentHoldExpiresAt: { $gt: new Date() }
      }
    ]
  }).select('date');

  const availability = new Map<string, boolean>();
  const current = new Date(startDate);
  
  while (current <= endDate) {
    const dateStr = current.toISOString().split('T')[0];
    const hasBooking = bookings.some(b => 
      b.date.toISOString().split('T')[0] === dateStr
    );
    availability.set(dateStr, !hasBooking);
    current.setDate(current.getDate() + 1);
  }
  
  return availability;
}

export async function expireOldPendingBookings() {
  await connectDB();
  
  const result = await Booking.updateMany(
    {
      paymentStatus: 'pending',
      paymentHoldExpiresAt: { $lt: new Date() }
    },
    {
      $set: { paymentStatus: 'expired' }
    }
  );
  
  return result.modifiedCount;
}
