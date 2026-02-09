'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function ConfirmationContent() {
    const searchParams = useSearchParams();
    const bookingId = searchParams.get('bookingId');
    const transactionId = searchParams.get('transaction_id') || searchParams.get('trxref');

    const [status, setStatus] = useState<'loading' | 'success' | 'failed' | 'pending'>('loading');
    const [booking, setBooking] = useState<any>(null);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        if (!bookingId) {
            setStatus('failed');
            setError('No booking ID provided');
            return;
        }

        const verifyPayment = async () => {
            try {
                const url = transactionId
                    ? `/api/payments/verify?bookingId=${bookingId}&transactionId=${transactionId}`
                    : `/api/payments/verify?bookingId=${bookingId}`;

                const response = await fetch(url);
                const data = await response.json();

                if (data.status === 'completed' || data.verified) {
                    setStatus('success');
                    setBooking(data.booking);
                } else if (data.status === 'pending') {
                    setStatus('pending');
                    // Poll every 3 seconds for pending payments
                    setTimeout(verifyPayment, 3000);
                } else {
                    setStatus('failed');
                    setError(data.error || 'Payment verification failed');
                }
            } catch (err) {
                setStatus('failed');
                setError('Failed to verify payment');
            }
        };

        verifyPayment();
    }, [bookingId, transactionId]);

    if (status === 'loading') {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <h2 className="text-2xl font-bold text-gray-900">Verifying Payment...</h2>
                    <p className="text-gray-600 mt-2">Please wait while we confirm your payment</p>
                </div>
            </div>
        );
    }

    if (status === 'pending') {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center max-w-md mx-auto px-4">
                    <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-10 h-10 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Payment Pending</h2>
                    <p className="text-gray-600 mb-6">
                        We&apos;re waiting for your payment confirmation. If you&apos;re using MoMo, please complete the payment on your phone.
                    </p>
                    <div className="w-8 h-8 border-4 border-yellow-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                </div>
            </div>
        );
    }

    if (status === 'failed') {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center max-w-md mx-auto px-4">
                    <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Payment Failed</h2>
                    <p className="text-gray-600 mb-6">{error || 'Something went wrong with your payment.'}</p>
                    <Link href="/book" className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-xl transition-colors">
                        Try Again
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-2xl mx-auto px-4">
                <div className="bg-white rounded-3xl shadow-xl p-8 text-center">
                    <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
                        <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>

                    <h1 className="text-4xl font-black text-gray-900 mb-4">Booking Confirmed!</h1>
                    <p className="text-xl text-gray-600 mb-10">
                        Your pitch is locked in. We&apos;ve sent the confirmation details to your email.
                    </p>

                    {booking && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                            <div className="bg-green-600 rounded-2xl p-6 text-white">
                                <div className="text-green-100 text-sm font-bold uppercase tracking-widest mb-2">Confirmation Code</div>
                                <div className="text-4xl font-black tracking-tighter">
                                    {booking.confirmationCode}
                                </div>
                                <div className="text-green-100 text-sm mt-4">
                                    Show this code at reception
                                </div>
                            </div>

                            <div className="bg-gray-50 rounded-2xl p-6 text-left">
                                <h3 className="font-bold text-gray-900 mb-4">Booking Details</h3>
                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Date:</span>
                                        <span className="font-bold">{new Date(booking.date).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Time:</span>
                                        <span className="font-bold">{booking.startTime} - {booking.endTime}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Total:</span>
                                        <span className="font-bold text-green-600">{booking.totalPrice?.toLocaleString()} RWF</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/" className="bg-gray-900 hover:bg-black text-white font-bold py-4 px-10 rounded-xl transition-colors">
                            Back to Home
                        </Link>
                        <button onClick={() => window.print()} className="bg-white border-2 border-gray-200 hover:border-gray-400 text-gray-700 font-bold py-4 px-10 rounded-xl transition-colors">
                            Print Receipt
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function ConfirmationPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        }>
            <ConfirmationContent />
        </Suspense>
    );
}
