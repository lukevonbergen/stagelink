import React from 'react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
          <a href="#" className="inline-flex justify-between items-center py-1 px-1 pr-4 mb-7 text-sm text-gray-700 bg-gray-100 rounded-full dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700" role="alert">
            <span className="text-xs bg-primary-600 rounded-full text-white px-4 py-1.5 mr-3">New</span> 
            <span className="text-sm font-medium">Check out Stagelink's release notes</span>
            <svg className="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
            </svg>
          </a>
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Connecting venues and performers</h1>
          <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">Streamline your live entertainment management with real-time ratings, digital tipping, and seamless scheduling.</p>
          <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
            <a href="#" className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
              Speak to sales
              <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
              </svg>
            </a>
            <a href="#" className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
              <svg className="mr-2 -ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path>
              </svg>
              See the product
            </a>  
          </div>
          <div className="px-4 mx-auto text-center md:max-w-screen-md lg:max-w-screen-lg lg:px-36">
            <span className="font-semibold text-gray-400 uppercase">TRUSTED BY</span>
            <div className="flex flex-wrap justify-center items-center mt-8 text-gray-500 sm:justify-between">
              {/* Placeholder Image 1 */}
              <img
                src="https://via.placeholder.com/150" // Replace with your image
                alt="Featured in 1"
                className="mr-5 mb-5 lg:mb-0 h-12"
              />
              {/* Placeholder Image 2 */}
              <img
                src="https://via.placeholder.com/150" // Replace with your image
                alt="Featured in 2"
                className="mr-5 mb-5 lg:mb-0 h-12"
              />
              {/* Placeholder Image 3 */}
              <img
                src="https://via.placeholder.com/150" // Replace with your image
                alt="Featured in 3"
                className="mr-5 mb-5 lg:mb-0 h-12"
              />
            </div>
          </div> 
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Features
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need to manage live performances seamlessly.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-lg shadow-sm text-center border border-gray-100">
              <div className="text-blue-600 mb-6">
                <i className="fas fa-calendar-alt text-5xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Easy Booking
              </h3>
              <p className="text-gray-600">
                Venues can book performers with just a few clicks. Performers can manage their availability effortlessly.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-lg shadow-sm text-center border border-gray-100">
              <div className="text-blue-600 mb-6">
                <i className="fas fa-chart-line text-5xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Analytics
              </h3>
              <p className="text-gray-600">
                Track performance trends, earnings, and booking patterns with detailed analytics.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-lg shadow-sm text-center border border-gray-100">
              <div className="text-blue-600 mb-6">
                <i className="fas fa-comments text-5xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Communication
              </h3>
              <p className="text-gray-600">
                Built-in messaging system for seamless communication between venues and performers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Us?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover the benefits of using our platform for your live performance needs.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Benefit 1 */}
            <div className="bg-white p-8 rounded-lg shadow-sm text-center border border-gray-100">
              <div className="text-blue-600 mb-6">
                <i className="fas fa-check-circle text-5xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Easy to Use
              </h3>
              <p className="text-gray-600">
                Intuitive interface designed for both venues and performers.
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="bg-white p-8 rounded-lg shadow-sm text-center border border-gray-100">
              <div className="text-blue-600 mb-6">
                <i className="fas fa-users text-5xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Community Driven
              </h3>
              <p className="text-gray-600">
                Join a growing community of venues and performers.
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="bg-white p-8 rounded-lg shadow-sm text-center border border-gray-100">
              <div className="text-blue-600 mb-6">
                <i className="fas fa-lightbulb text-5xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Innovative Solutions
              </h3>
              <p className="text-gray-600">
                Cutting-edge tools to enhance your live performance experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hear from venues and performers who have transformed their booking process with us.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Testimonial 1 */}
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
              <p className="text-gray-600 mb-6">
                "This platform has made booking performers so much easier. The analytics feature is a game-changer!"
              </p>
              <div className="flex items-center">
                <img
                  src="https://via.placeholder.com/50" // Replace with user avatar
                  alt="User"
                  className="rounded-full mr-4"
                />
                <div>
                  <p className="font-semibold text-gray-900">John Doe</p>
                  <p className="text-sm text-gray-600">Venue Owner</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
              <p className="text-gray-600 mb-6">
                "Managing my availability and bookings has never been this simple. Highly recommend!"
              </p>
              <div className="flex items-center">
                <img
                  src="https://via.placeholder.com/50" // Replace with user avatar
                  alt="User"
                  className="rounded-full mr-4"
                />
                <div>
                  <p className="font-semibold text-gray-900">Jane Smith</p>
                  <p className="text-sm text-gray-600">Performer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Pricing
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Affordable plans for venues and performers of all sizes.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {/* Plan 1 */}
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Basic
              </h3>
              <p className="text-gray-600 mb-4">For small venues and independent performers.</p>
              <p className="text-3xl font-bold text-gray-900 mb-6">
                $9.99<span className="text-lg text-gray-600">/month</span>
              </p>
              <ul className="text-gray-600 mb-8">
                <li>Up to 10 bookings/month</li>
                <li>Basic analytics</li>
                <li>Email support</li>
              </ul>
              <a
                href="/login"
                className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Get Started
              </a>
            </div>

            {/* Plan 2 */}
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Pro
              </h3>
              <p className="text-gray-600 mb-4">For growing venues and professional performers.</p>
              <p className="text-3xl font-bold text-gray-900 mb-6">
                $29.99<span className="text-lg text-gray-600">/month</span>
              </p>
              <ul className="text-gray-600 mb-8">
                <li>Unlimited bookings</li>
                <li>Advanced analytics</li>
                <li>Priority support</li>
              </ul>
              <a
                href="/login"
                className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gradient-to-r from-blue-50 to-purple-50 border-t border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-gray-600">
            &copy; {new Date().getFullYear()} Stagelink. All rights reserved.
          </p>
          <p className="text-sm text-gray-600">
            <a href="/terms" className="hover:text-gray-900">Terms of Service</a> |{' '}
            <a href="/privacy" className="hover:text-gray-900">Privacy Policy</a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;