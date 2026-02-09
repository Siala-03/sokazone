'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

function PaymentForm({ bookingId, clientSecret }: { bookingId: string; clientSecret: string }) {
    const stripe = useStripe();
    const elements = useElements();
    const router = useRouter();
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!stripe || !elements) return;

        setIsProcessing(true);
        setError('');

        const { error: submitError } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/booking/confirmation?bookingId=${bookingId}`,
            },
        });

        if (submitError) {
            setError(submitError.message || 'Payment failed');
            setIsProcessing(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <PaymentElement />

            {error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl">
                    <p className="text-red-700">{error}</p>
                </div>
            )}

            <button
                type="submit"
                disabled={!stripe || isProcessing}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isProcessing ? (
                    <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                    </span>
                ) : 'Pay Now'}
            </button>
        </form>
    );
}

function PaymentPageContent() {
    const searchParams = useSearchParams();
    const bookingId = searchParams.get('bookingId');
    const clientSecret = searchParams.get('clientSecret');

    const [booking, setBooking] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        if (!bookingId) {
            setError('No booking ID provided');
            setLoading(false);
            return;
        }

        const fetchBooking = async () => {
            try {
                const response = await fetch(`/api/payments/verify?bookingId=${bookingId}`);
                const data = await response.json();

                if (data.booking) {
                    setBooking(data.booking);
                }
            } catch (err) {
                setError('Failed to load booking details');
            } finally {
                setLoading(false);
            }
        };

        fetchBooking();
    }, [bookingId]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (error || !bookingId || !clientSecret) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center max-w-md px-4">
                    <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Payment Error</h2>
                    <p className="text-gray-600 mb-6">{error || 'Missing payment information'}</p>
                    <a href="/book" className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-xl">
                        Start New Booking
                    </a>
                </div>
            </div>
        );
    }

    const options = {
        clientSecret,
        appearance: {
            theme: 'stripe' as const,
            variables: {
                colorPrimary: '#16a34a',
                borderRadius: '12px',
            },
        },
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-lg mx-auto px-4">
                <div className="bg-white rounded-3xl shadow-xl p-8">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900">Complete Your Payment</h1>
                        <p className="text-gray-600 mt-2">Enter your card details below</p>
                    </div>

                    {booking && (
                        <div className="bg-gray-50 rounded-xl p-4 mb-8">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Total:</span>
                                <span className="font-bold text-green-600">{booking.totalPrice?.toLocaleString()} RWF</span>
                            </div>
                        </div>
                    )}

                    <Elements stripe={stripePromise} options={options}>
                        <PaymentForm bookingId={bookingId} clientSecret={clientSecret} />
                    </Elements>

                    <div className="mt-6 flex items-center justify-center text-gray-400 text-sm">
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                        Secured by Stripe
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function PaymentPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        }>
            <PaymentPageContent />
        </Suspense>
    );
}
