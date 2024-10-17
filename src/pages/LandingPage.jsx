// src/pages/LandingPage.jsx
import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-gradient-to-r from-blue-600 to-purple-800 text-white">
      {/* Content Layer */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 md:px-12 mb-16">
        {/* Logo Section */}
        <img
          src="https://www.myretailconnect.com/assets/img/Retail-Connect-Logo.png"
          alt="Retail Connect Logo"
          className="h-32 mb-8 transition-transform duration-300 transform hover:scale-105"
        />

        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
          Welcome to Retail Connect
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-md">
          Connecting retailers and distributors for a seamless shopping
          experience.
        </p>

        {/* Call to Action Buttons */}
        <div className="flex space-x-4 mb-10">
          <Link
            to="/auth/login"
            className="bg-white text-blue-500 px-6 py-3 rounded-lg shadow-lg hover:bg-gray-100 transition duration-300"
          >
            Login
          </Link>
          <Link
            to="/auth/signup"
            className="bg-white text-blue-500 px-6 py-3 rounded-lg shadow-lg hover:bg-gray-100 transition duration-300"
          >
            Sign Up
          </Link>
        </div>
      </div>

      {/* Informative Sections with Image Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl px-4">
        <div className="bg-white text-blue-500 rounded-lg shadow-lg p-6 flex flex-col items-center">
          <img
            src="https://cdn.dribbble.com/users/970957/screenshots/5504725/gif.gif"
            alt="Feature 1"
            className="w-full h-32 object-cover mb-4 rounded-lg"
          />
          <h2 className="text-2xl font-bold mb-2">Feature 1</h2>
          <p className="text-center">
            Quick and easy registration for retailers and distributors.
          </p>
        </div>

        <div className="bg-white text-blue-500 rounded-lg shadow-lg p-6 flex flex-col items-center">
          <img
            src="https://cdn.dribbble.com/users/1732368/screenshots/16980280/media/c069338069e9c069b6a68af473e69fb1.gif"
            alt="Feature 2"
            className="w-full h-32 object-cover mb-4 rounded-lg"
          />
          <h2 className="text-2xl font-bold mb-2">Feature 2</h2>
          <p className="text-center">
            Seamless connectivity between retailers and distributors.
          </p>
        </div>

        <div className="bg-white text-blue-500 rounded-lg shadow-lg p-6 flex flex-col items-center">
          <img
            src="https://www.atuqui.com/wp-content/uploads/2019/05/Gif-Web-Development.gif"
            alt="Feature 3"
            className="w-full h-32 object-cover mb-4 rounded-lg"
          />
          <h2 className="text-2xl font-bold mb-2">Feature 3</h2>
          <p className="text-center">
            Real-time analytics to make informed business decisions.
          </p>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-white text-blue-500 p-6 rounded-lg shadow-lg max-w-3xl mb-10 mt-10">
        <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
        <blockquote className="italic">
          "Retail Connect has transformed the way I manage my business. The
          platform is intuitive and the support is exceptional!"
          <br />
          <span className="font-bold">- Alex, Retailer</span>
        </blockquote>
      </div>

      {/* Get Started Button Section */}
      <div className="flex flex-col items-center mb-8">
        <p className="text-sm mb-2">Join us today and start your journey!</p>
        <Link
          to="/auth/signup"
          className="bg-white text-blue-500 px-8 py-3 rounded-lg shadow-lg hover:bg-gray-100 transition duration-300"
        >
          Get Started
        </Link>
      </div>

      {/* Footer Section */}
      <div className="flex flex-col items-center mb-8">
        <p className="text-sm">© 2024 Retail Connect. All rights reserved.</p>
      </div>
    </div>
  );
};

export default LandingPage;
