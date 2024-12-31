import React from 'react';

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to Stagelink
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          We're building something amazing. Stay tuned!
        </p>
        <a
          href="#"
          className="inline-block bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Notify me
        </a>
      </div>
    </div>
  );
};

export default LandingPage;