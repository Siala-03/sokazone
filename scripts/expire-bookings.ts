import { expireOldPendingBookings } from '../lib/booking-utils';

async function runExpiryJob() {
  console.log('[Booking Expiry Job] Starting...');
  
  try {
    const expiredCount = await expireOldPendingBookings();
    console.log(`[Booking Expiry Job] Expired ${expiredCount} old pending bookings`);
  } catch (error) {
    console.error('[Booking Expiry Job] Error:', error);
  }
}

// Run every 5 minutes
const INTERVAL = 5 * 60 * 1000;

console.log(`[Booking Expiry Job] Scheduled to run every ${INTERVAL / 1000} seconds`);

// Run immediately on startup
runExpiryJob();

// Then run on interval
setInterval(runExpiryJob, INTERVAL);

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('[Booking Expiry Job] Shutting down...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('[Booking Expiry Job] Shutting down...');
  process.exit(0);
});
