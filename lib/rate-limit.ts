import { NextRequest, NextResponse } from 'next/server';

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

const store: RateLimitStore = {};

export interface RateLimitConfig {
  interval: number; // Time window in milliseconds
  maxRequests: number; // Maximum requests per interval
}

export function rateLimit(config: RateLimitConfig) {
  const { interval, maxRequests } = config;

  return async (request: NextRequest): Promise<NextResponse | null> => {
    // Get client identifier (IP address)
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : 
               request.headers.get('x-real-ip') || 
               'unknown';

    const now = Date.now();
    const key = `${ip}:${request.nextUrl.pathname}`;

    // Clean up old entries
    if (store[key] && store[key].resetTime < now) {
      delete store[key];
    }

    // Initialize or update rate limit data
    if (!store[key]) {
      store[key] = {
        count: 1,
        resetTime: now + interval,
      };
      return null; // Allow request
    }

    store[key].count++;

    if (store[key].count > maxRequests) {
      const resetIn = Math.ceil((store[key].resetTime - now) / 1000);
      return NextResponse.json(
        {
          error: 'Too many requests',
          message: `Rate limit exceeded. Try again in ${resetIn} seconds.`,
          retryAfter: resetIn,
        },
        {
          status: 429,
          headers: {
            'Retry-After': resetIn.toString(),
            'X-RateLimit-Limit': maxRequests.toString(),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': store[key].resetTime.toString(),
          },
        }
      );
    }

    return null; // Allow request
  };
}

// Cleanup old entries periodically (every 10 minutes)
setInterval(() => {
  const now = Date.now();
  Object.keys(store).forEach((key) => {
    if (store[key].resetTime < now) {
      delete store[key];
    }
  });
}, 10 * 60 * 1000);
