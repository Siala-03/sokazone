import Link from 'next/link';

export default function Home() {
  return (

    <div className="min-h-screen bg-white">
      {/* Hero Section - Large Image with Overlay */}
      <section className="relative h-[600px] md:h-[700px]">
        <div className="absolute inset-0">
          <img
            src="/images/hero_pitch_aerial_1766953963645.png"
            alt="Soka Zone Pitch"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="relative h-full flex items-center justify-center text-center px-4">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Where Good Football Lives
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8">
              Professional pitches for serious players in Kigali
            </p>
            <Link
              href="/book"
              className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 animate-cta-pop"
            >
              Book a Pitch
            </Link>
          </div>
        </div>
      </section>

      {/* 3-Image Gallery Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 - Professional Pitch */}
            <div className="relative rounded-lg overflow-hidden shadow-lg group cursor-pointer h-80">
              <img
                src="/photos/seven-aside-football.png"
                alt="Professional pitch"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Default Overlay - Shows Title */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6 transition-opacity duration-300 group-hover:opacity-0">
                <h3 className="text-white text-3xl font-bold">Professional Pitch</h3>
              </div>
              {/* Hover Overlay - Shows Details */}
              <div className="absolute inset-0 bg-green-600/95 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-8">
                <div className="text-center text-white">
                  <h3 className="text-3xl font-bold mb-4">Premium Artificial Turf</h3>
                  <p className="text-lg mb-4">Professional-grade surface designed for serious football</p>
                  <ul className="text-left space-y-2">
                    <li className="flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      FIFA-standard quality
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Even playing surface
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Regular maintenance
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Card 2 - Live Action */}
            <div className="relative rounded-lg overflow-hidden shadow-lg group cursor-pointer h-80">
              <img
                src="/photos/RAYONS-SPORT-VS-APR.jpg"
                alt="Players in action"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6 transition-opacity duration-300 group-hover:opacity-0">
                <h3 className="text-white text-3xl font-bold">Live the Action</h3>
              </div>
              <div className="absolute inset-0 bg-blue-600/95 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-8">
                <div className="text-center text-white">
                  <h3 className="text-3xl font-bold mb-4">Competitive Matches</h3>
                  <p className="text-lg mb-4">Where teams compete and champions emerge</p>
                  <ul className="text-left space-y-2">
                    <li className="flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      5-a-side & 7-a-side
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      League hosting
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Tournament ready
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Card 3 - Night Games */}
            <div className="relative rounded-lg overflow-hidden shadow-lg group cursor-pointer h-80">
              <img
                src="/photos/african football.webp"
                alt="Night games"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6 transition-opacity duration-300 group-hover:opacity-0">
                <h3 className="text-white text-3xl font-bold">Night Games</h3>
              </div>
              <div className="absolute inset-0 bg-yellow-600/95 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-8">
                <div className="text-center text-white">
                  <h3 className="text-3xl font-bold mb-4">Floodlit Excellence</h3>
                  <p className="text-lg mb-4">Play under professional lighting systems</p>
                  <ul className="text-left space-y-2">
                    <li className="flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      LED floodlights
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Full visibility
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Evening sessions
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Cards Section - Blue, Green, Yellow */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Blue Card */}
            <div className="bg-blue-600 rounded-2xl p-8 text-white">
              <div className="text-5xl font-bold mb-2">20+</div>
              <div className="text-xl font-semibold mb-2">Active Teams</div>
              <p className="text-blue-100">
                Organizations and teams trust Soka Zone for their football needs
              </p>
            </div>

            {/* Green Card */}
            <div className="bg-green-700 rounded-2xl p-8 text-white">
              <div className="text-5xl font-bold mb-2">95%</div>
              <div className="text-xl font-semibold mb-2">Satisfaction Rate</div>
              <p className="text-green-100">
                Players love our facilities and professional service
              </p>
            </div>

            {/* Yellow/Orange Card */}
            <div className="bg-yellow-500 rounded-2xl p-8 text-white">
              <div className="text-5xl font-bold mb-2">50+</div>
              <div className="text-xl font-semibold mb-2">Weekly Games</div>
              <p className="text-yellow-100">
                Matches played every week on our premium pitches
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Green Feature Cards Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Why Choose Soka Zone
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-green-800 rounded-2xl p-8 text-white">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold mb-3">Professional Turf</h3>
              <p className="text-green-100">
                High-quality artificial grass that plays true every single time
              </p>
            </div>

            <div className="bg-green-800 rounded-2xl p-8 text-white">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold mb-3">Reliable Scheduling</h3>
              <p className="text-green-100">
                Book online and play on time, every time, no conflicts
              </p>
            </div>

            <div className="bg-green-800 rounded-2xl p-8 text-white">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold mb-3">Night Games</h3>
              <p className="text-green-100">
                LED floodlights for perfect visibility during evening matches
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4-Image Gallery Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Our Facilities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Facility Card 1 - Team Spirit */}
            <div className="relative rounded-lg overflow-hidden shadow-lg group cursor-pointer">
              <img
                src="/photos/gasogi_players_with_the_ball_during_the_game_against_sc_kiyovu_at_kigali_stadium.the_city_of_kigali_announced_that_effective_with_the_2022-23_season_gasogi_united_will_be_among_clubs_they_support._olivier_mugwiza.jpg"
                alt="Team celebration"
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-100 group-hover:opacity-0 transition-opacity duration-300 flex items-end p-4">
                <h4 className="text-white font-bold text-lg">Team Spirit</h4>
              </div>
              <div className="absolute inset-0 bg-green-600/95 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center text-white">
                <h4 className="font-bold text-xl mb-3">Build Team Chemistry</h4>
                <p className="text-sm leading-relaxed">
                  Foster camaraderie and teamwork in a professional environment where players bond through quality football
                </p>
              </div>
            </div>

            {/* Facility Card 2 - Quality Equipment */}
            <div className="relative rounded-lg overflow-hidden shadow-lg group cursor-pointer">
              <img
                src="/photos/seven-aside-football.png"
                alt="Professional equipment"
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-100 group-hover:opacity-0 transition-opacity duration-300 flex items-end p-4">
                <h4 className="text-white font-bold text-lg">Quality Equipment</h4>
              </div>
              <div className="absolute inset-0 bg-blue-600/95 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center text-white">
                <h4 className="font-bold text-xl mb-3">Professional Grade</h4>
                <p className="text-sm leading-relaxed">
                  FIFA-approved footballs, quality goals, and all the equipment you need for a professional match experience
                </p>
              </div>
            </div>

            {/* Facility Card 3 - Night Lighting */}
            <div className="relative rounded-lg overflow-hidden shadow-lg group cursor-pointer">
              <img
                src="/images/pitch_night_view_1766954204010.png"
                alt="Night games"
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-100 group-hover:opacity-0 transition-opacity duration-300 flex items-end p-4">
                <h4 className="text-white font-bold text-lg">Night Lighting</h4>
              </div>
              <div className="absolute inset-0 bg-yellow-600/95 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center text-white">
                <h4 className="font-bold text-xl mb-3">24/7 Availability</h4>
                <p className="text-sm leading-relaxed">
                  State-of-the-art LED floodlights ensure perfect visibility for evening and night games all year round
                </p>
              </div>
            </div>

            {/* Facility Card 4 - Premium Pitch */}
            <div className="relative rounded-lg overflow-hidden shadow-lg group cursor-pointer">
              <img
                src="/photos/RAYONS-SPORT-VS-APR.jpg"
                alt="Aerial view"
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-100 group-hover:opacity-0 transition-opacity duration-300 flex items-end p-4">
                <h4 className="text-white font-bold text-lg">Premium Pitch</h4>
              </div>
              <div className="absolute inset-0 bg-green-700/95 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center text-white">
                <h4 className="font-bold text-xl mb-3">Exceptional Quality</h4>
                <p className="text-sm leading-relaxed">
                  Professionally maintained artificial turf that provides consistent ball roll and perfect playing conditions
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who Plays Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Built for Players Who Take the Game Seriously
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                Whether you&apos;re a corporate team building camaraderie, a university squad training for competition,
                or friends who just love quality football - Soka Zone provides the environment where good football happens.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-green-600 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Corporate teams and organizations</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-green-600 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">University and school teams</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-green-600 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Embassy and international community teams</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-green-600 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Casual groups who value good facilities</span>
                </li>
              </ul>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/photos/african football.webp"
                alt="Players in action"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="mb-4">
            <div className="inline-block">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                Gallery
              </h2>
              <div className="h-1 w-24 bg-orange-500"></div>
            </div>
          </div>

          <p className="text-gray-600 text-lg mb-12">
            Capturing the moments that make Soka Zone special
          </p>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Gallery Image 1 */}
            <div className="group relative overflow-hidden rounded-xl shadow-lg cursor-pointer h-80">
              <img
                src="/photos/RAYONS-SPORT-VS-APR.jpg"
                alt="Football action at Soka Zone"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            {/* Gallery Image 2 */}
            <div className="group relative overflow-hidden rounded-xl shadow-lg cursor-pointer h-80">
              <img
                src="/images/pitch_gallery_01_1766955346720.png"
                alt="Team celebration at Soka Zone"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            {/* Gallery Image 3 */}
            <div className="group relative overflow-hidden rounded-xl shadow-lg cursor-pointer h-80">
              <img
                src="/photos/african football.webp"
                alt="Intense match moment at Soka Zone"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            {/* Gallery Image 4 */}
            <div className="group relative overflow-hidden rounded-xl shadow-lg cursor-pointer h-80">
              <img
                src="/images/pitch_action_players_1766954145685.png"
                alt="Players in action"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            {/* Gallery Image 5 */}
            <div className="group relative overflow-hidden rounded-xl shadow-lg cursor-pointer h-80">
              <img
                src="/photos/gasogi_players_with_the_ball_during_the_game_against_sc_kiyovu_at_kigali_stadium.the_city_of_kigali_announced_that_effective_with_the_2022-23_season_gasogi_united_will_be_among_clubs_they_support._olivier_mugwiza.jpg"
                alt="Team spirit"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            {/* Gallery Image 6 */}
            <div className="group relative overflow-hidden rounded-xl shadow-lg cursor-pointer h-80">
              <img
                src="/photos/pexels-faustin-nkurunziza-2151028521-31464448.jpg"
                alt="Professional facilities"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section with Scrolling Animation */}
      <section className="py-16 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Trusted by Leading Organizations
          </h2>

          {/* Scrolling Container */}
          <div className="relative">
            {/* Gradient Overlays */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-50 to-transparent z-10"></div>
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-50 to-transparent z-10"></div>

            {/* Scrolling Animation */}
            <div className="flex animate-scroll-left">
              {/* First Set of Logos */}
              <div className="flex items-center gap-16 px-8">
                <div className="flex-shrink-0 w-56 h-40 bg-white rounded-xl shadow-md flex items-center justify-center hover:shadow-xl transition-shadow overflow-hidden">
                  <img src="/photos/rdb log.jpeg" alt="RDB" className="w-full h-full object-contain p-4" />
                </div>
                <div className="flex-shrink-0 w-56 h-40 bg-white rounded-xl shadow-md flex items-center justify-center hover:shadow-xl transition-shadow overflow-hidden">
                  <img src="/photos/skol-logo-png_seeklogo-127612.png" alt="SKOL" className="w-full h-full object-contain p-4" />
                </div>
                <div className="flex-shrink-0 w-56 h-40 bg-white rounded-xl shadow-md flex items-center justify-center hover:shadow-xl transition-shadow overflow-hidden">
                  <img src="/photos/New-mtn-logo.jpg" alt="MTN" className="w-full h-full object-contain p-4" />
                </div>
                <div className="flex-shrink-0 w-56 h-40 bg-white rounded-xl shadow-md flex items-center justify-center hover:shadow-xl transition-shadow overflow-hidden">
                  <img src="/photos/Airtel_logo-01.png" alt="Airtel" className="w-full h-full object-contain p-4" />
                </div>
                <div className="flex-shrink-0 w-56 h-40 bg-white rounded-xl shadow-md flex items-center justify-center hover:shadow-xl transition-shadow overflow-hidden">
                  <img src="/photos/FIFA_logo_without_slogan.svg.png" alt="FIFA" className="w-full h-full object-contain p-4" />
                </div>
                <div className="flex-shrink-0 w-56 h-40 bg-white rounded-xl shadow-md flex items-center justify-center hover:shadow-xl transition-shadow overflow-hidden">
                  <img src="/photos/Confederation_of_African_Football_logo.svg.png" alt="CAF" className="w-full h-full object-contain p-4" />
                </div>
              </div>

              {/* Duplicate Set for Infinite Loop */}
              <div className="flex items-center gap-16 px-8">
                <div className="flex-shrink-0 w-56 h-40 bg-white rounded-xl shadow-md flex items-center justify-center hover:shadow-xl transition-shadow overflow-hidden">
                  <img src="/photos/rdb log.jpeg" alt="RDB" className="w-full h-full object-contain p-4" />
                </div>
                <div className="flex-shrink-0 w-56 h-40 bg-white rounded-xl shadow-md flex items-center justify-center hover:shadow-xl transition-shadow overflow-hidden">
                  <img src="/photos/skol-logo-png_seeklogo-127612.png" alt="SKOL" className="w-full h-full object-contain p-4" />
                </div>
                <div className="flex-shrink-0 w-56 h-40 bg-white rounded-xl shadow-md flex items-center justify-center hover:shadow-xl transition-shadow overflow-hidden">
                  <img src="/photos/New-mtn-logo.jpg" alt="MTN" className="w-full h-full object-contain p-4" />
                </div>
                <div className="flex-shrink-0 w-56 h-40 bg-white rounded-xl shadow-md flex items-center justify-center hover:shadow-xl transition-shadow overflow-hidden">
                  <img src="/photos/Airtel_logo-01.png" alt="Airtel" className="w-full h-full object-contain p-4" />
                </div>
                <div className="flex-shrink-0 w-56 h-40 bg-white rounded-xl shadow-md flex items-center justify-center hover:shadow-xl transition-shadow overflow-hidden">
                  <img src="/photos/FIFA_logo_without_slogan.svg.png" alt="FIFA" className="w-full h-full object-contain p-4" />
                </div>
                <div className="flex-shrink-0 w-56 h-40 bg-white rounded-xl shadow-md flex items-center justify-center hover:shadow-xl transition-shadow overflow-hidden">
                  <img src="/photos/Confederation_of_African_Football_logo.svg.png" alt="CAF" className="w-full h-full object-contain p-4" />
                </div>
              </div>

              {/* Third Set for Seamless Loop */}
              <div className="flex items-center gap-16 px-8">
                <div className="flex-shrink-0 w-56 h-40 bg-white rounded-xl shadow-md flex items-center justify-center hover:shadow-xl transition-shadow overflow-hidden">
                  <img src="/photos/rdb log.jpeg" alt="RDB" className="w-full h-full object-contain p-4" />
                </div>
                <div className="flex-shrink-0 w-56 h-40 bg-white rounded-xl shadow-md flex items-center justify-center hover:shadow-xl transition-shadow overflow-hidden">
                  <img src="/photos/skol-logo-png_seeklogo-127612.png" alt="SKOL" className="w-full h-full object-contain p-4" />
                </div>
                <div className="flex-shrink-0 w-56 h-40 bg-white rounded-xl shadow-md flex items-center justify-center hover:shadow-xl transition-shadow overflow-hidden">
                  <img src="/photos/New-mtn-logo.jpg" alt="MTN" className="w-full h-full object-contain p-4" />
                </div>
                <div className="flex-shrink-0 w-56 h-40 bg-white rounded-xl shadow-md flex items-center justify-center hover:shadow-xl transition-shadow overflow-hidden">
                  <img src="/photos/Airtel_logo-01.png" alt="Airtel" className="w-full h-full object-contain p-4" />
                </div>
                <div className="flex-shrink-0 w-56 h-40 bg-white rounded-xl shadow-md flex items-center justify-center hover:shadow-xl transition-shadow overflow-hidden">
                  <img src="/photos/FIFA_logo_without_slogan.svg.png" alt="FIFA" className="w-full h-full object-contain p-4" />
                </div>
                <div className="flex-shrink-0 w-56 h-40 bg-white rounded-xl shadow-md flex items-center justify-center hover:shadow-xl transition-shadow overflow-hidden">
                  <img src="/photos/Confederation_of_African_Football_logo.svg.png" alt="CAF" className="w-full h-full object-contain p-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Events Section - Before Footer */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header with Orange Underline */}
          <div className="mb-4">
            <div className="inline-block">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                Latest Events
              </h2>
              <div className="h-1 w-24 bg-orange-500"></div>
            </div>
          </div>

          {/* Events Subtitle */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-gray-800 border-b-2 border-gray-300 pb-2 inline-block">
              Events
            </h3>
          </div>

          {/* Event Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Event Card 1 - Soka Zone Tournament */}
            <div className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg shadow-lg mb-4 h-64">
                <img
                  src="/photos/event-night-game.png"
                  alt="Soka Zone 7-aside tournament"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">
                Soka Zone 7-aside  tournament
              </h4>
              <p className="text-gray-500 text-sm">27 December 2025</p>
            </div>

            {/* Event Card 2 - Rwanda Corporate League */}
            <div className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg shadow-lg mb-4 h-64">
                <img
                  src="/photos/event-daytime-game.jpg"
                  alt="Rwandair Vs Inkontanyi - Rwanda Corporate League"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">
                Rwandair Vs Inkontanyi - Rwanda Corporate League
              </h4>
              <p className="text-gray-500 text-sm">22 October 2025</p>
            </div>

            {/* Event Card 3 - University Match */}
            <div className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg shadow-lg mb-4 h-64">
                <img
                  src="/photos/alu-vs-ur-match.jpg"
                  alt="African Leadership University Vs University of Rwanda"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">
                African Leadership University Vs University of Rwanda
              </h4>
              <p className="text-gray-500 text-sm">10 October 2025</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-green-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Play at Soka Zone?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Book your pitch now and experience the difference
          </p>
          <Link
            href="/book"
            className="inline-block bg-white text-green-600 hover:bg-gray-100 font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 animate-bounce-gentle hover:scale-105"
          >
            Book a Pitch Now
          </Link>
        </div>
      </section>
    </div>
  )
}
