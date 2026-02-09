'use client';

import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { format } from 'date-fns';

type PaymentMethod = 'momo' | 'visa';

interface TimeSlot {
    time: string;
    available: boolean;
    price: number;
}

export default function BookingPage() {
    const [step, setStep] = useState(1);
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [selectedTime, setSelectedTime] = useState<string>('');
    const [duration, setDuration] = useState<number>(2);
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('momo');
    const [customerInfo, setCustomerInfo] = useState({
        name: '',
        email: '',
        phone: '',
        notes: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [bookingConfirmation, setBookingConfirmation] = useState<any>(null);
    const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
    const [slotsLoading, setSlotsLoading] = useState(false);

    // Fetch available time slots when date or duration changes
    useEffect(() => {
        const fetchAvailableSlots = async () => {
            if (!selectedDate) return;

            setSlotsLoading(true);
            try {
                const response = await fetch(
                    `/api/bookings/availability?date=${selectedDate.toISOString()}&duration=${duration}`
                );
                const data = await response.json();

                if (data.slots) {
                    // Transform API response to TimeSlot format
                    const slots: TimeSlot[] = data.slots.map((slot: any) => ({
                        time: slot.startTime,
                        available: slot.available,
                        price: slot.price || 35000, // Default price if not provided
                    }));
                    setTimeSlots(slots.filter((slot: TimeSlot) => slot.available));
                } else {
                    // Fallback to default slots if API fails
                    setTimeSlots([
                        { time: '06:00', available: true, price: 30000 },
                        { time: '07:00', available: true, price: 30000 },
                        { time: '08:00', available: true, price: 35000 },
                        { time: '09:00', available: true, price: 35000 },
                        { time: '10:00', available: true, price: 35000 },
                        { time: '11:00', available: true, price: 35000 },
                        { time: '12:00', available: true, price: 40000 },
                        { time: '13:00', available: true, price: 40000 },
                        { time: '14:00', available: true, price: 40000 },
                        { time: '15:00', available: true, price: 40000 },
                        { time: '16:00', available: true, price: 45000 },
                        { time: '17:00', available: true, price: 45000 },
                        { time: '18:00', available: true, price: 50000 },
                        { time: '19:00', available: true, price: 50000 },
                        { time: '20:00', available: true, price: 50000 },
                        { time: '21:00', available: true, price: 45000 },
                    ]);
                }
            } catch (error) {
                console.error('Failed to fetch slots:', error);
                // Use fallback slots on error
                setTimeSlots([
                    { time: '06:00', available: true, price: 30000 },
                    { time: '07:00', available: true, price: 30000 },
                    { time: '08:00', available: true, price: 35000 },
                    { time: '09:00', available: true, price: 35000 },
                    { time: '10:00', available: true, price: 35000 },
                    { time: '11:00', available: true, price: 35000 },
                    { time: '12:00', available: true, price: 40000 },
                    { time: '13:00', available: true, price: 40000 },
                    { time: '14:00', available: true, price: 40000 },
                    { time: '15:00', available: true, price: 40000 },
                    { time: '16:00', available: true, price: 45000 },
                    { time: '17:00', available: true, price: 45000 },
                    { time: '18:00', available: true, price: 50000 },
                    { time: '19:00', available: true, price: 50000 },
                    { time: '20:00', available: true, price: 50000 },
                    { time: '21:00', available: true, price: 45000 },
                ]);
            } finally {
                setSlotsLoading(false);
            }
        };

        fetchAvailableSlots();
    }, [selectedDate, duration]);


    const calculateEndTime = (startTime: string, hours: number): string => {
        const [hour] = startTime.split(':').map(Number);
        const endHour = hour + hours;
        return `${endHour.toString().padStart(2, '0')}:00`;
    };

    const calculateTotalPrice = (): number => {
        if (!selectedTime) return 0;
        const slot = timeSlots.find(s => s.time === selectedTime);
        return slot ? slot.price * duration : 0;
    };

    const handleSubmitBooking = async () => {
        setIsLoading(true);

        try {
            // Step 1: Create the booking
            const bookingResponse = await fetch('/api/bookings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    pitchId: '000000000000000000000001', // Mock pitch ID - in production, fetch from API
                    pitchSize: '7-a-side',
                    date: selectedDate,
                    startTime: selectedTime,
                    endTime: calculateEndTime(selectedTime, duration),
                    duration,
                    totalPrice: calculateTotalPrice(),
                    paymentMethod,
                    customerName: customerInfo.name,
                    customerEmail: customerInfo.email,
                    customerPhone: customerInfo.phone,
                    notes: customerInfo.notes,
                }),
            });

            const bookingData = await bookingResponse.json();

            if (!bookingResponse.ok) {
                alert(bookingData.error || 'Booking failed. Please try again.');
                setIsLoading(false);
                return;
            }

            const bookingId = bookingData.booking.id;

            // Step 2: Initialize payment
            const paymentResponse = await fetch('/api/payments/initialize', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    bookingId,
                    paymentMethod: paymentMethod === 'momo' ? 'momo' : 'card',
                    email: customerInfo.email,
                    phone: customerInfo.phone,
                    name: customerInfo.name,
                }),
            });

            const paymentData = await paymentResponse.json();

            if (!paymentResponse.ok) {
                // Payment init failed, but booking was created
                // Redirect to confirmation page to show pending status
                alert(paymentData.error || 'Payment initialization failed. Your booking is saved but pending payment.');
                window.location.href = `/booking/confirmation?bookingId=${bookingId}`;
                return;
            }

            // Step 3: Handle payment redirect or show Stripe form
            if (paymentData.paymentUrl) {
                // MoMo: Redirect to Flutterwave payment page
                window.location.href = paymentData.paymentUrl;
            } else if (paymentData.clientSecret) {
                // Stripe: Redirect to Stripe payment page
                window.location.href = `/booking/payment?bookingId=${bookingId}&clientSecret=${encodeURIComponent(paymentData.clientSecret)}`;
            } else {
                // Fallback: Go to confirmation page
                window.location.href = `/booking/confirmation?bookingId=${bookingId}`;
            }
        } catch (error) {
            console.error('Booking error:', error);
            alert('An error occurred. Please try again.');
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero with Background Image */}
            <section className="relative h-[400px] md:h-[500px]">
                <div className="absolute inset-0">
                    <img
                        src="/photos/seven-aside-football.png"
                        alt="Teams ready to play at Soka Zone"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-green-900/90 to-blue-900/80"></div>
                </div>
                <div className="relative h-full flex items-center justify-center text-center px-4">
                    <div className="max-w-4xl">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 animate-fade-in">
                            Lock In the Game Before Someone Else Does
                        </h1>
                        <p className="text-xl text-white/95 mb-6">
                            The best games happen because the pitch was booked, the time was fixed, and the players showed up.
                        </p>
                        <div className="flex justify-center gap-4 text-white/90 text-sm">
                            <span className="flex items-center">
                                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                Instant Confirmation
                            </span>
                            <span className="flex items-center">
                                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                Secure Payment
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Booking Form */}
            <section className="py-12">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Progress Steps */}
                    <div className="mb-12">
                        <div className="flex items-center justify-center space-x-4">
                            {[1, 2, 3].map((s) => (
                                <div key={s} className="flex items-center">
                                    <div
                                        className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300 ${step >= s
                                            ? 'bg-green-600 text-white shadow-lg scale-110'
                                            : 'bg-gray-200 text-gray-400'
                                            }`}
                                    >
                                        {s}
                                    </div>
                                    {s < 3 && (
                                        <div
                                            className={`w-20 h-1.5 rounded-full transition-all duration-500 ${step > s ? 'bg-green-600' : 'bg-gray-200'
                                                }`}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-center mt-6">
                            <div className="text-center bg-white px-6 py-2 rounded-full shadow-sm border border-gray-100">
                                <span className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                                    {step === 1 && 'Step 1: Choose Date & Time'}
                                    {step === 2 && 'Step 2: Your Details'}
                                    {step === 3 && 'Step 3: Review & Payment'}
                                    {step === 4 && 'Booking Confirmed!'}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="card bg-white max-w-4xl mx-auto">
                        {/* Step 1: Date & Time */}
                        {step === 1 && (
                            <div className="animate-fade-in">
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                                    <div>
                                        <h2 className="text-3xl font-bold text-gray-900">Choose Date & Time</h2>
                                        <p className="text-gray-600">Select your preferred slot for the 7-a-side pitch</p>
                                    </div>
                                    <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg font-bold flex items-center border border-blue-100">
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        7-a-Side Pitch
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                                    {/* Calendar Column */}
                                    <div>
                                        <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                                            <span className="w-8 h-8 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mr-3 text-sm">1</span>
                                            Select Date
                                        </h3>
                                        <div className="bg-white p-4 rounded-2xl shadow-inner border border-gray-100">
                                            <Calendar
                                                onChange={(value) => setSelectedDate(value as Date)}
                                                value={selectedDate}
                                                minDate={new Date()}
                                                className="border-0 w-full"
                                            />
                                        </div>
                                        <div className="mt-4 p-4 bg-green-50 rounded-xl border border-green-100 flex items-center justify-between">
                                            <span className="text-green-800 font-medium">Selected Date:</span>
                                            <span className="text-green-900 font-bold">{format(selectedDate, 'MMMM dd, yyyy')}</span>
                                        </div>
                                    </div>

                                    {/* Time Slots Column */}
                                    <div>
                                        <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                                            <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mr-3 text-sm">2</span>
                                            Select Time
                                        </h3>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                                            {timeSlots.map((slot) => (
                                                <button
                                                    id={`time-slot-${slot.time}`}
                                                    key={slot.time}
                                                    onClick={() => setSelectedTime(slot.time)}
                                                    disabled={!slot.available}
                                                    className={`p-4 rounded-xl border-2 transition-all duration-200 text-center group ${selectedTime === slot.time
                                                        ? 'border-green-600 bg-green-600 text-white shadow-md'
                                                        : slot.available
                                                            ? 'border-gray-100 bg-gray-50 hover:border-green-400 hover:bg-white'
                                                            : 'border-gray-100 bg-gray-100 text-gray-400 cursor-not-allowed'
                                                        }`}
                                                >
                                                    <div className={`font-bold text-lg ${selectedTime === slot.time ? 'text-white' : 'text-gray-900'}`}>{slot.time}</div>
                                                    <div className={`text-xs mt-1 ${selectedTime === slot.time ? 'text-green-100' : 'text-gray-500'}`}>{slot.price.toLocaleString()} RWF</div>
                                                </button>
                                            ))}
                                        </div>

                                        <div className="mt-8">
                                            <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                                                <span className="w-8 h-8 bg-yellow-100 text-yellow-600 rounded-lg flex items-center justify-center mr-3 text-sm">3</span>
                                                Duration
                                            </h3>
                                            <div className="flex gap-3">
                                                {[2, 3, 4].map((hours) => (
                                                    <button
                                                        id={`duration-${hours}h`}
                                                        key={hours}
                                                        onClick={() => setDuration(hours)}
                                                        className={`flex-1 py-3 rounded-xl border-2 transition-all duration-200 font-bold ${duration === hours
                                                            ? 'border-green-600 bg-green-50 text-green-700'
                                                            : 'border-gray-100 bg-gray-50 hover:border-green-400 hover:bg-white text-gray-600'
                                                            }`}
                                                    >
                                                        {hours}h
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-12 flex justify-end">
                                    <button
                                        id="continue-to-details"
                                        onClick={() => setStep(2)}
                                        disabled={!selectedTime}
                                        className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-12 rounded-xl text-lg transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-1"
                                    >
                                        Continue to Details
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Step 2: Customer Details */}
                        {step === 2 && (
                            <div className="animate-fade-in">
                                <div className="mb-8">
                                    <h2 className="text-3xl font-bold text-gray-900">Your Details</h2>
                                    <p className="text-gray-600">Provide your contact information for the booking</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">
                                                Full Name
                                            </label>
                                            <input
                                                type="text"
                                                value={customerInfo.name}
                                                onChange={(e) =>
                                                    setCustomerInfo({ ...customerInfo, name: e.target.value })
                                                }
                                                className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-green-500 focus:ring-0 transition-colors bg-gray-50"
                                                placeholder="John Doe"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">
                                                Email Address
                                            </label>
                                            <input
                                                type="email"
                                                value={customerInfo.email}
                                                onChange={(e) =>
                                                    setCustomerInfo({ ...customerInfo, email: e.target.value })
                                                }
                                                className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-green-500 focus:ring-0 transition-colors bg-gray-50"
                                                placeholder="john@example.com"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">
                                                Phone Number
                                            </label>
                                            <input
                                                type="tel"
                                                value={customerInfo.phone}
                                                onChange={(e) =>
                                                    setCustomerInfo({ ...customerInfo, phone: e.target.value })
                                                }
                                                className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-green-500 focus:ring-0 transition-colors bg-gray-50"
                                                placeholder="+250 XXX XXX XXX"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">
                                            Additional Notes
                                        </label>
                                        <textarea
                                            value={customerInfo.notes}
                                            onChange={(e) =>
                                                setCustomerInfo({ ...customerInfo, notes: e.target.value })
                                            }
                                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-green-500 focus:ring-0 transition-colors bg-gray-50 h-[228px] resize-none"
                                            placeholder="Any special requests or notes for the staff..."
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-between items-center">
                                    <button onClick={() => setStep(1)} className="text-gray-500 hover:text-gray-700 font-bold flex items-center transition-colors">
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                        </svg>
                                        Back to Date & Time
                                    </button>
                                    <button
                                        onClick={() => setStep(3)}
                                        disabled={!customerInfo.name || !customerInfo.email || !customerInfo.phone}
                                        className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-12 rounded-xl text-lg transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-1"
                                    >
                                        Continue to Payment
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Step 3: Payment & Confirmation */}
                        {step === 3 && (
                            <div className="animate-fade-in">
                                <div className="mb-8">
                                    <h2 className="text-3xl font-bold text-gray-900">Review & Payment</h2>
                                    <p className="text-gray-600">Finalize your booking and secure your spot</p>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                                    {/* Summary Column */}
                                    <div className="lg:col-span-1">
                                        <div className="bg-gray-50 rounded-2xl p-6 border-2 border-gray-100 sticky top-4">
                                            <h3 className="font-bold text-gray-900 mb-6 text-xl pb-4 border-b border-gray-200">Booking Summary</h3>
                                            <div className="space-y-4 text-gray-700">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-gray-500">Pitch:</span>
                                                    <span className="font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-lg text-sm">7-a-Side</span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-gray-500">Date:</span>
                                                    <span className="font-bold">{format(selectedDate, 'MMM dd, yyyy')}</span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-gray-500">Time:</span>
                                                    <span className="font-bold">{selectedTime} - {calculateEndTime(selectedTime, duration)}</span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-gray-500">Duration:</span>
                                                    <span className="font-bold">{duration} hour{duration > 1 ? 's' : ''}</span>
                                                </div>
                                                <div className="pt-6 mt-6 border-t border-gray-200">
                                                    <div className="flex justify-between items-center mb-2">
                                                        <span className="text-gray-500">Subtotal:</span>
                                                        <span className="font-bold">{calculateTotalPrice().toLocaleString()} RWF</span>
                                                    </div>
                                                    <div className="flex justify-between items-center text-xl">
                                                        <span className="font-bold text-gray-900">Total:</span>
                                                        <span className="font-black text-green-600">{calculateTotalPrice().toLocaleString()} RWF</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Payment Column */}
                                    <div className="lg:col-span-2">
                                        <h3 className="font-bold text-gray-900 mb-4 text-lg">Select Payment Method</h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                                            <button
                                                onClick={() => setPaymentMethod('momo')}
                                                className={`relative p-6 rounded-2xl border-2 transition-all duration-300 group overflow-hidden ${paymentMethod === 'momo'
                                                    ? 'border-green-600 bg-green-50'
                                                    : 'border-gray-100 bg-gray-50 hover:border-green-400 hover:bg-white'
                                                    }`}
                                            >
                                                <div className="relative flex items-center">
                                                    <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mr-4 shadow-md group-hover:scale-110 transition-transform duration-300">
                                                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                                        </svg>
                                                    </div>
                                                    <div className="text-left">
                                                        <div className="font-bold text-gray-900 text-lg">MoMo</div>
                                                        <div className="text-xs text-gray-500">MTN & Airtel</div>
                                                    </div>
                                                </div>
                                                {paymentMethod === 'momo' && (
                                                    <div className="absolute top-4 right-4">
                                                        <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center shadow-sm">
                                                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                )}
                                            </button>

                                            <button
                                                onClick={() => setPaymentMethod('visa')}
                                                className={`relative p-6 rounded-2xl border-2 transition-all duration-300 group overflow-hidden ${paymentMethod === 'visa'
                                                    ? 'border-blue-600 bg-blue-50'
                                                    : 'border-gray-100 bg-gray-50 hover:border-blue-400 hover:bg-white'
                                                    }`}
                                            >
                                                <div className="relative flex items-center">
                                                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mr-4 shadow-md group-hover:scale-110 transition-transform duration-300">
                                                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                                        </svg>
                                                    </div>
                                                    <div className="text-left">
                                                        <div className="font-bold text-gray-900 text-lg">Visa</div>
                                                        <div className="text-xs text-gray-500">Debit/Credit</div>
                                                    </div>
                                                </div>
                                                {paymentMethod === 'visa' && (
                                                    <div className="absolute top-4 right-4">
                                                        <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center shadow-sm">
                                                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                )}
                                            </button>
                                        </div>

                                        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-xl mb-8">
                                            <div className="flex">
                                                <div className="flex-shrink-0">
                                                    <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                                <div className="ml-3">
                                                    <p className="text-sm text-yellow-700">
                                                        By confirming, you agree to our terms of service. Bookings are final and non-refundable within 24 hours of the game.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex justify-between items-center">
                                            <button onClick={() => setStep(2)} className="text-gray-500 hover:text-gray-700 font-bold flex items-center transition-colors">
                                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                                </svg>
                                                Back to Details
                                            </button>
                                            <button
                                                onClick={handleSubmitBooking}
                                                disabled={isLoading}
                                                className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-12 rounded-xl text-lg transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-1"
                                            >
                                                {isLoading ? (
                                                    <span className="flex items-center">
                                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                        </svg>
                                                        Processing...
                                                    </span>
                                                ) : 'Confirm & Pay Now'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 4: Confirmation */}
                        {step === 4 && bookingConfirmation && (
                            <div className="animate-fade-in text-center py-8">
                                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                                    <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>

                                <h2 className="text-4xl font-black text-gray-900 mb-4">Booking Confirmed!</h2>
                                <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
                                    Your pitch is locked in. We&apos;ve sent the confirmation details to <span className="font-bold text-gray-900">{customerInfo.email}</span>.
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                                    <div className="bg-green-600 rounded-3xl p-8 text-white shadow-xl transform hover:scale-105 transition-transform duration-300">
                                        <div className="text-green-100 text-sm font-bold uppercase tracking-widest mb-2">Confirmation Code</div>
                                        <div className="text-5xl font-black mb-4 tracking-tighter">
                                            {bookingConfirmation.confirmationCode}
                                        </div>
                                        <div className="text-green-100 text-sm">
                                            Show this code at the reception when you arrive.
                                        </div>
                                    </div>

                                    <div className="bg-white rounded-3xl p-8 border-2 border-gray-100 shadow-lg text-left">
                                        <h3 className="font-bold text-gray-900 mb-6 text-xl">Booking Recap</h3>
                                        <div className="space-y-4">
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-500">Date:</span>
                                                <span className="font-bold text-gray-900">{format(selectedDate, 'MMMM dd, yyyy')}</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-500">Time:</span>
                                                <span className="font-bold text-gray-900">{selectedTime} - {calculateEndTime(selectedTime, duration)}</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-500">Pitch:</span>
                                                <span className="font-bold text-blue-600">7-a-Side</span>
                                            </div>
                                            <div className="pt-4 mt-4 border-t border-gray-100 flex justify-between items-center">
                                                <span className="font-bold text-gray-900">Total Paid:</span>
                                                <span className="font-black text-green-600 text-2xl">{calculateTotalPrice().toLocaleString()} RWF</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <button
                                        onClick={() => window.location.href = '/'}
                                        className="bg-gray-900 hover:bg-black text-white font-bold py-4 px-12 rounded-xl text-lg transition-all duration-300 shadow-lg"
                                    >
                                        Back to Home
                                    </button>
                                    <button
                                        onClick={() => window.print()}
                                        className="bg-white border-2 border-gray-200 hover:border-gray-400 text-gray-700 font-bold py-4 px-12 rounded-xl text-lg transition-all duration-300"
                                    >
                                        Print Receipt
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Info Section */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="font-bold text-gray-900 mb-2">Book Early</h3>
                            <p className="text-gray-600 text-sm">
                                After-work hours, evenings, and weekends fill fast. Don&apos;t wait.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="font-bold text-gray-900 mb-2">Instant Confirmation</h3>
                            <p className="text-gray-600 text-sm">
                                Get your booking code immediately after payment.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <h3 className="font-bold text-gray-900 mb-2">Secure Payment</h3>
                            <p className="text-gray-600 text-sm">
                                Safe and secure payment via MoMo or Visa.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
