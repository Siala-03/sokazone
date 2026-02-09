export default function ContactPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section with Background Image */}
            <section className="relative h-[400px] md:h-[500px]">
                <div className="absolute inset-0">
                    <img
                        src="/images/pitch_action_players_1766954145685.png"
                        alt="Contact us"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-green-800/90 to-blue-800/90"></div>
                </div>
                <div className="relative h-full flex items-center justify-center text-center px-4">
                    <div className="max-w-4xl">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Let&apos;s Set Up Your Game Properly
                        </h1>
                        <p className="text-xl md:text-2xl text-white/95 max-w-3xl mx-auto mb-6">
                            For bookings, enquiries, or organized group sessions, reach out and we&apos;ll handle it professionally.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="mailto:sokazone@gmail.com"
                                className="inline-block bg-white text-green-700 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg text-lg transition-all duration-300 animate-cta-pop"
                            >
                                Send us an Email
                            </a>
                            <a
                                href="tel:+250780000000"
                                className="inline-block border-2 border-white text-white hover:bg-white hover:text-green-700 font-bold py-3 px-8 rounded-lg text-lg transition-all duration-300 animate-pulse-subtle"
                            >
                                Call Us Now
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Information */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
                        Get in Touch
                    </h2>
                    <p className="text-center text-gray-600 mb-12 text-lg">
                        We&apos;re here to help you book your perfect game
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Email */}
                        <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group">
                            <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="font-bold text-gray-900 mb-2 text-lg">Email</h3>
                            <a href="mailto:sokazone@gmail.com" className="text-green-600 hover:text-green-700 transition-colors break-words">
                                sokazone@gmail.com
                            </a>
                        </div>

                        {/* Phone */}
                        <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group">
                            <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                            </div>
                            <h3 className="font-bold text-gray-900 mb-2 text-lg">Phone</h3>
                            <div className="space-y-1 text-sm">
                                <a href="tel:+250780000000" className="block text-green-600 hover:text-green-700 transition-colors">
                                    +250 780 000 000
                                </a>
                            </div>
                        </div>

                        {/* Location */}
                        <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group">
                            <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-700 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <h3 className="font-bold text-gray-900 mb-2 text-lg">Visit Us</h3>
                            <p className="text-gray-700 text-sm">Soka Zone</p>
                            <p className="text-gray-700 text-sm">KK102St, Sanitas Kanombe</p>
                            <p className="text-gray-700 text-sm">Kigali, Rwanda</p>
                        </div>

                        {/* Hours */}
                        <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group">
                            <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="font-bold text-gray-900 mb-2 text-lg">Hours</h3>
                            <p className="text-gray-700 text-sm">Open Daily</p>
                            <p className="text-gray-700 text-sm">Morning to Late Evening</p>
                            <p className="text-gray-500 text-xs mt-2 italic">Arrive 10-15 min early</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Interactive Map Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
                        Find Us on the Map
                    </h2>
                    <p className="text-center text-gray-600 mb-12 text-lg">
                        Soka Zone - KK102St, Sanitas Kanombe, Kigali
                    </p>

                    <div className="rounded-2xl overflow-hidden shadow-2xl">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3987.5177869986947!2d30.126577!3d-1.9534!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMcKwNTcnMTIuMiJTIDMwwrAwNyczMy4zIkU!5e0!3m2!1sen!2srw!4v1234567890"
                            width="100%"
                            height="500"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Soka Zone Location Map"
                            className="w-full"
                        ></iframe>
                    </div>

                    <div className="mt-8 text-center">
                        <a
                            href="https://www.google.com/maps/dir//Soka+Zone,+KK102St,+Kanombe,+Kigali"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-all duration-300 animate-cta-pop"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                            </svg>
                            Get Directions
                        </a>
                    </div>
                </div>
            </section>

            {/* Info Section */}
            <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold mb-6 text-gray-900">Final Note</h2>
                    <p className="text-lg text-gray-700 mb-6">
                        Soka Zone is built on good football and clear communication.
                    </p>
                    <p className="text-lg text-gray-700 mb-8">
                        If you care about how the game is played and how things are run, you&apos;ll feel at home here.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <a
                            href="/book"
                            className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group"
                        >
                            <svg className="w-12 h-12 text-green-600 mx-auto mb-3 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <h3 className="font-bold text-gray-900 mb-2">Book a Pitch</h3>
                            <p className="text-gray-600 text-sm">Reserve your slot online</p>
                        </a>

                        <a
                            href="/pitches"
                            className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group"
                        >
                            <svg className="w-12 h-12 text-blue-600 mx-auto mb-3 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                            <h3 className="font-bold text-gray-900 mb-2">View Facilities</h3>
                            <p className="text-gray-600 text-sm">Explore our pitches</p>
                        </a>

                        <a
                            href="/organizations"
                            className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group"
                        >
                            <svg className="w-12 h-12 text-green-600 mx-auto mb-3 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <h3 className="font-bold text-gray-900 mb-2">Organizations</h3>
                            <p className="text-gray-600 text-sm">Team & corporate bookings</p>
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}
