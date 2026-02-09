import Link from 'next/link';

export default function OrganizationsPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section with Background */}
            <section className="relative h-[500px] md:h-[600px]">
                <div className="absolute inset-0">
                    <img
                        src="/photos/organizations-hero.png"
                        alt="Corporate teams building connections through football"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-700/85"></div>
                </div>
                <div className="relative h-full flex items-center justify-center text-center px-4">
                    <div className="max-w-4xl">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Football That Strengthens Teams
                        </h1>
                        <p className="text-xl md:text-2xl text-white/95 max-w-3xl mx-auto mb-8">
                            When football is played consistently in the right environment, teams communicate better,
                            fitness improves, and connections form naturally.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-block bg-white text-blue-700 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg text-lg transition-all duration-300 animate-cta-pop"
                        >
                            Get Started
                        </Link>
                    </div>
                </div>
            </section>

            {/* Interactive Organization Showcase */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
                        Who We Serve
                    </h2>
                    <p className="text-center text-gray-600 mb-12 text-lg max-w-3xl mx-auto">
                        From universities to corporate teams, we provide the perfect environment for football excellence
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Universities Card */}
                        <div className="relative rounded-2xl overflow-hidden shadow-lg group cursor-pointer h-96">
                            <img
                                src="/photos/gasogi_players_with_the_ball_during_the_game_against_sc_kiyovu_at_kigali_stadium.the_city_of_kigali_announced_that_effective_with_the_2022-23_season_gasogi_united_will_be_among_clubs_they_support._olivier_mugwiza.jpg"
                                alt="University students playing sports"
                                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-green-900/90 via-green-700/40 to-transparent"></div>
                            <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                                <div className="transform transition-all duration-500 group-hover:translate-y-0 translate-y-2">
                                    <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mb-4 backdrop-blur-sm group-hover:scale-110 transition-transform">
                                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-bold mb-2">Universities & Students</h3>
                                    <p className="text-white/90 mb-4">
                                        Supporting student wellness, team sports, and campus tournaments
                                    </p>
                                    <div className="flex gap-2 flex-wrap">
                                        <span className="text-xs bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">Leagues</span>
                                        <span className="text-xs bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">Training</span>
                                        <span className="text-xs bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">Tournaments</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Corporate Teams Card */}
                        <div className="relative rounded-2xl overflow-hidden shadow-lg group cursor-pointer h-96">
                            <img
                                src="/photos/RAYONS-SPORT-VS-APR.jpg"
                                alt="Corporate teams"
                                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-700/40 to-transparent"></div>
                            <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                                <div className="transform transition-all duration-500 group-hover:translate-y-0 translate-y-2">
                                    <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mb-4 backdrop-blur-sm group-hover:scale-110 transition-transform">
                                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-bold mb-2">Corporate Teams</h3>
                                    <p className="text-white/90 mb-4">
                                        Team building, wellness programs, and after-work games
                                    </p>
                                    <div className="flex gap-2 flex-wrap">
                                        <span className="text-xs bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">Team Building</span>
                                        <span className="text-xs bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">Wellness</span>
                                        <span className="text-xs bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">After-Work</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* International Organizations Card */}
                        <div className="relative rounded-2xl overflow-hidden shadow-lg group cursor-pointer h-96">
                            <img
                                src="/photos/african football.webp"
                                alt="International organizations"
                                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-yellow-900/90 via-yellow-700/40 to-transparent"></div>
                            <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                                <div className="transform transition-all duration-500 group-hover:translate-y-0 translate-y-2">
                                    <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mb-4 backdrop-blur-sm group-hover:scale-110 transition-transform">
                                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-bold mb-2">Diplomatic & International</h3>
                                    <p className="text-white/90 mb-4">
                                        Embassies, NGOs, and international communities connecting through sport
                                    </p>
                                    <div className="flex gap-2 flex-wrap">
                                        <span className="text-xs bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">Embassies</span>
                                        <span className="text-xs bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">NGOs</span>
                                        <span className="text-xs bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">Tournaments</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* University Focus Section */}
            <section className="py-20 bg-gradient-to-br from-green-50 to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="relative group">
                            <div className="absolute inset-0 bg-green-600 rounded-2xl transform rotate-3 group-hover:rotate-6 transition-transform duration-500"></div>
                            <img
                                src="/photos/pexels-faustin-nkurunziza-2151028521-31464448.jpg"
                                alt="University students"
                                className="relative rounded-2xl shadow-2xl transform group-hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                        <div>
                            <div className="inline-block bg-green-600 text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
                                UNIVERSITY PARTNERSHIPS
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">
                                Supporting Academic Excellence Through Sport
                            </h2>
                            <p className="text-lg text-gray-700 mb-6">
                                We work with leading universities to provide professional facilities for their sports programs,
                                promoting student wellness, team spirit, and healthy competition.
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-start group cursor-pointer">
                                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-green-600 transition-colors duration-300">
                                        <svg className="w-6 h-6 text-green-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-1">Campus Sports Programs</h3>
                                        <p className="text-gray-600">Hosting university teams, leagues and tournaments</p>
                                    </div>
                                </div>
                                <div className="flex items-start group cursor-pointer">
                                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-blue-600 transition-colors duration-300">
                                        <svg className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-1">Flexible Scheduling</h3>
                                        <p className="text-gray-600">Aligned with academic calendars and exam periods</p>
                                    </div>
                                </div>
                                <div className="flex items-start group cursor-pointer">
                                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-green-600 transition-colors duration-300">
                                        <svg className="w-6 h-6 text-green-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-1">Student Wellness</h3>
                                        <p className="text-gray-600">Promoting fitness, stress relief, and social connections</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Benefits Grid */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
                        Why Organizations Choose Us
                    </h2>
                    <p className="text-center text-gray-600 mb-12 text-lg">
                        Professional facilities and dedicated support for your team
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Reliable Scheduling */}
                        <div className="relative rounded-2xl overflow-hidden shadow-lg group cursor-pointer h-80">
                            <img
                                src="/photos/football.jpg"
                                alt="Reliable Scheduling"
                                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-green-900/90 via-green-700/40 to-transparent"></div>
                            <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                                <div className="transform transition-all duration-500 group-hover:translate-y-0 translate-y-2">
                                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4 backdrop-blur-sm group-hover:scale-110 transition-transform">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">Reliable Scheduling</h3>
                                    <p className="text-white/90 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">
                                        Games start on time, every time. Automated booking ensures no conflicts.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Professional Management */}
                        <div className="relative rounded-2xl overflow-hidden shadow-lg group cursor-pointer h-80">
                            <img
                                src="/photos/seven-aside-football.png"
                                alt="Professional Management"
                                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-700/40 to-transparent"></div>
                            <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                                <div className="transform transition-all duration-500 group-hover:translate-y-0 translate-y-2">
                                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4 backdrop-blur-sm group-hover:scale-110 transition-transform">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">Professional Management</h3>
                                    <p className="text-white/90 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">
                                        Well-maintained facilities with staff always on site to assist you.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Flexible Payment */}
                        <div className="relative rounded-2xl overflow-hidden shadow-lg group cursor-pointer h-80">
                            <img
                                src="/photos/images.jpeg"
                                alt="Flexible Payment"
                                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-yellow-900/90 via-yellow-700/40 to-transparent"></div>
                            <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                                <div className="transform transition-all duration-500 group-hover:translate-y-0 translate-y-2">
                                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4 backdrop-blur-sm group-hover:scale-110 transition-transform">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">Flexible Payment</h3>
                                    <p className="text-white/90 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">
                                        Easy payment options including MoMo, Visa, and corporate invoicing.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Community Building */}
                        <div className="relative rounded-2xl overflow-hidden shadow-lg group cursor-pointer h-80">
                            <img
                                src="/photos/african football.webp"
                                alt="Community Building"
                                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-green-900/90 via-green-700/40 to-transparent"></div>
                            <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                                <div className="transform transition-all duration-500 group-hover:translate-y-0 translate-y-2">
                                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4 backdrop-blur-sm group-hover:scale-110 transition-transform">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">Community Building</h3>
                                    <p className="text-white/90 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">
                                        Connect with other teams, join leagues, and build lasting relationships.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Partners Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
                        Our Partners
                    </h2>
                    <p className="text-center text-gray-600 mb-12 text-lg">
                        Trusted by leading organizations across Rwanda
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Partner 1: Tech Solutions */}
                        <div className="relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group cursor-pointer h-64">
                            <img
                                src="/photos/pitches-hero.png"
                                alt="TechNova Background"
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/95 via-blue-900/70 to-blue-900/30 group-hover:via-blue-900/80 transition-all duration-300"></div>
                            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                                <div className="transform transition-all duration-300 group-hover:-translate-y-2">
                                    <div className="w-16 h-16 mx-auto mb-3 flex items-center justify-center bg-white/10 rounded-full backdrop-blur-sm">
                                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                        </svg>
                                    </div>
                                    <p className="text-lg font-bold text-white uppercase tracking-wider mb-2">TechNova</p>
                                </div>
                                <p className="text-white/90 text-sm opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                                    Providing digital solutions for league management and player stats.
                                </p>
                            </div>
                        </div>

                        {/* Partner 2: Education */}
                        <div className="relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group cursor-pointer h-64">
                            <img
                                src="/photos/football.jpg"
                                alt="UniCore Background"
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-red-900/95 via-red-900/70 to-red-900/30 group-hover:via-red-900/80 transition-all duration-300"></div>
                            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                                <div className="transform transition-all duration-300 group-hover:-translate-y-2">
                                    <div className="w-16 h-16 mx-auto mb-3 flex items-center justify-center bg-white/10 rounded-full backdrop-blur-sm">
                                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                        </svg>
                                    </div>
                                    <p className="text-lg font-bold text-white uppercase tracking-wider mb-2">UniCore</p>
                                </div>
                                <p className="text-white/90 text-sm opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                                    Partnering for student wellness and inter-campus leagues.
                                </p>
                            </div>
                        </div>

                        {/* Partner 3: Health */}
                        <div className="relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group cursor-pointer h-64">
                            <img
                                src="/photos/RAYONS-SPORT-VS-APR.jpg"
                                alt="VitalLife Background"
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-green-900/95 via-green-900/70 to-green-900/30 group-hover:via-green-900/80 transition-all duration-300"></div>
                            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                                <div className="transform transition-all duration-300 group-hover:-translate-y-2">
                                    <div className="w-16 h-16 mx-auto mb-3 flex items-center justify-center bg-white/10 rounded-full backdrop-blur-sm">
                                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                        </svg>
                                    </div>
                                    <p className="text-lg font-bold text-white uppercase tracking-wider mb-2">VitalLife</p>
                                </div>
                                <p className="text-white/90 text-sm opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                                    Promoting active lifestyles and community health initiatives.
                                </p>
                            </div>
                        </div>

                        {/* Partner 4: Construction */}
                        <div className="relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group cursor-pointer h-64">
                            <img
                                src="/photos/night-football-floodlit.png"
                                alt="BuildRight Background"
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-orange-900/95 via-orange-900/70 to-orange-900/30 group-hover:via-orange-900/80 transition-all duration-300"></div>
                            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                                <div className="transform transition-all duration-300 group-hover:-translate-y-2">
                                    <div className="w-16 h-16 mx-auto mb-3 flex items-center justify-center bg-white/10 rounded-full backdrop-blur-sm">
                                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                    </div>
                                    <p className="text-lg font-bold text-white uppercase tracking-wider mb-2">BuildRight</p>
                                </div>
                                <p className="text-white/90 text-sm opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                                    Building world-class sports infrastructure and facilities.
                                </p>
                            </div>
                        </div>

                        {/* Partner 5: Finance */}
                        <div className="relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group cursor-pointer h-64">
                            <img
                                src="/photos/images.jpeg"
                                alt="FinCorp Background"
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/95 via-indigo-900/70 to-indigo-900/30 group-hover:via-indigo-900/80 transition-all duration-300"></div>
                            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                                <div className="transform transition-all duration-300 group-hover:-translate-y-2">
                                    <div className="w-16 h-16 mx-auto mb-3 flex items-center justify-center bg-white/10 rounded-full backdrop-blur-sm">
                                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <p className="text-lg font-bold text-white uppercase tracking-wider mb-2">FinCorp</p>
                                </div>
                                <p className="text-white/90 text-sm opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                                    Supporting sustainable sports development and youth programs.
                                </p>
                            </div>
                        </div>

                        {/* Partner 6: Energy */}
                        <div className="relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group cursor-pointer h-64">
                            <img
                                src="/photos/african football.webp"
                                alt="PowerGrid Background"
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-yellow-900/95 via-yellow-900/70 to-yellow-900/30 group-hover:via-yellow-900/80 transition-all duration-300"></div>
                            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                                <div className="transform transition-all duration-300 group-hover:-translate-y-2">
                                    <div className="w-16 h-16 mx-auto mb-3 flex items-center justify-center bg-white/10 rounded-full backdrop-blur-sm">
                                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    </div>
                                    <p className="text-lg font-bold text-white uppercase tracking-wider mb-2">PowerGrid</p>
                                </div>
                                <p className="text-white/90 text-sm opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                                    Powering our night games and sustainable facility operations.
                                </p>
                            </div>
                        </div>

                        {/* Partner 7: Logistics */}
                        <div className="relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group cursor-pointer h-64">
                            <img
                                src="/photos/football.jpg"
                                alt="GlobalMove Background"
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-teal-900/95 via-teal-900/70 to-teal-900/30 group-hover:via-teal-900/80 transition-all duration-300"></div>
                            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                                <div className="transform transition-all duration-300 group-hover:-translate-y-2">
                                    <div className="w-16 h-16 mx-auto mb-3 flex items-center justify-center bg-white/10 rounded-full backdrop-blur-sm">
                                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <p className="text-lg font-bold text-white uppercase tracking-wider mb-2">GlobalMove</p>
                                </div>
                                <p className="text-white/90 text-sm opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                                    Ensuring smooth operations and equipment transport for events.
                                </p>
                            </div>
                        </div>

                        {/* Partner 8: Media */}
                        <div className="relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group cursor-pointer h-64">
                            <img
                                src="/photos/RAYONS-SPORT-VS-APR.jpg"
                                alt="MediaStream Background"
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-purple-900/95 via-purple-900/70 to-purple-900/30 group-hover:via-purple-900/80 transition-all duration-300"></div>
                            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                                <div className="transform transition-all duration-300 group-hover:-translate-y-2">
                                    <div className="w-16 h-16 mx-auto mb-3 flex items-center justify-center bg-white/10 rounded-full backdrop-blur-sm">
                                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <p className="text-lg font-bold text-white uppercase tracking-wider mb-2">MediaStream</p>
                                </div>
                                <p className="text-white/90 text-sm opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                                    Broadcasting the excitement of local football to the world.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-blue-600 to-green-600 text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
                </div>
                <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        Let&apos;s Build Your Football Program
                    </h2>
                    <p className="text-xl text-blue-100 mb-8">
                        Contact us to discuss regular bookings, league scheduling, or custom arrangements for your organization
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/contact"
                            className="inline-block bg-white text-blue-600 hover:bg-gray-100 font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 animate-cta-pop"
                        >
                            Contact Us
                        </Link>
                        <Link
                            href="/book"
                            className="inline-block border-2 border-white text-white hover:bg-white hover:text-blue-600 font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 animate-pulse-subtle"
                        >
                            Book a Pitch
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
