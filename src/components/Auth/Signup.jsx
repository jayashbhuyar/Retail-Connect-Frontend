import React, { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("retailer"); // Default role
  const [companyName, setCompanyName] = useState("");
  const [shopName, setShopName] = useState("");
  const [image, setImage] = useState(""); // Image field
  const [address, setAddress] = useState(""); // Added address field
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [darkMode, setDarkMode] = useState(true); // State for dark mode

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const formData = {
      name,
      email,
      phone,
      password,
      role,
      companyName: role === "distributor" ? companyName : undefined, // companyName for distributors only
      shopName: role === "retailer" ? shopName : undefined, // shopName for retailers only
      image,
      address, // Added address to form data
    };

    try {
      const response = await fetch("http://localhost:8000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(data.message);
        // Optionally, redirect to login or dashboard
      } else {
        setError(data.error);
      }
    } catch (error) {
      setError("An error occurred while signing up.");
    }
  };

  return (
    <div
      className={`flex flex-col justify-center items-center w-full h-screen ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      } px-5`}
    >
      <div
        className={`xl:max-w-3xl w-full p-5 sm:p-10 rounded-md shadow-lg ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <h1 className="text-center text-xl sm:text-3xl font-semibold mb-4">
          Register for a free account
        </h1>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="mb-4 p-2 rounded-md focus:outline-none border border-gray-300"
        >
          Toggle to {darkMode ? "Light" : "Dark"} Mode
        </button>

        <div className="w-full mt-8">
          <div className="mx-auto max-w-xs sm:max-w-md md:max-w-lg flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                className={`w-full px-5 py-3 rounded-lg font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2 ${
                  darkMode
                    ? "focus:border-white bg-gray-700 text-white"
                    : "focus:border-black bg-gray-100 text-black"
                }`}
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                className={`w-full px-5 py-3 rounded-lg font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2 ${
                  darkMode
                    ? "focus:border-white bg-gray-700 text-white"
                    : "focus:border-black bg-gray-100 text-black"
                }`}
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <input
              className={`w-full px-5 py-3 rounded-lg font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2 ${
                darkMode
                  ? "focus:border-white bg-gray-700 text-white"
                  : "focus:border-black bg-gray-100 text-black"
              }`}
              type="tel"
              placeholder="Enter your phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            <input
              className={`w-full px-5 py-3 rounded-lg font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2 ${
                darkMode
                  ? "focus:border-white bg-gray-700 text-white"
                  : "focus:border-black bg-gray-100 text-black"
              }`}
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Role:
              </label>
              <select
                value={role}
                onChange={(e) => {
                  setRole(e.target.value);
                  if (e.target.value === "retailer") {
                    setCompanyName(""); // Clear company name if switching to retailer
                  } else {
                    setShopName(""); // Clear shop name if switching to distributor
                  }
                }}
                className={`w-full px-5 py-3 rounded-lg font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2 ${
                  darkMode
                    ? "focus:border-white bg-gray-700 text-white"
                    : "focus:border-black bg-gray-100 text-black"
                }`}
              >
                <option value="retailer">Retailer</option>
                <option value="distributor">Distributor</option>
                {/* <option value="admin">Admin</option> */}
              </select>
            </div>
            {role === "distributor" && (
              <input
                className={`w-full px-5 py-3 rounded-lg font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2 ${
                  darkMode
                    ? "focus:border-white bg-gray-700 text-white"
                    : "focus:border-black bg-gray-100 text-black"
                }`}
                type="text"
                placeholder="Enter your company name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
              />
            )}
            {role === "retailer" && (
              <input
                className={`w-full px-5 py-3 rounded-lg font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2 ${
                  darkMode
                    ? "focus:border-white bg-gray-700 text-white"
                    : "focus:border-black bg-gray-100 text-black"
                }`}
                type="text"
                placeholder="Enter your shop name"
                value={shopName}
                onChange={(e) => setShopName(e.target.value)}
                required
              />
            )}
            <input
              className={`w-full px-5 py-3 rounded-lg font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2 ${
                darkMode
                  ? "focus:border-white bg-gray-700 text-white"
                  : "focus:border-black bg-gray-100 text-black"
              }`}
              type="text"
              placeholder="Enter your address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
            <input
              className={`w-full px-5 py-3 rounded-lg font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2 ${
                darkMode
                  ? "focus:border-white bg-gray-700 text-white"
                  : "focus:border-black bg-gray-100 text-black"
              }`}
              type="text"
              placeholder="Paste your image URL"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              required
            />
            <button
              type="submit"
              onClick={handleSubmit}
              className={`mt-5 tracking-wide font-semibold bg-[#E9522C] text-gray-100 w-full py-4 rounded-lg hover:bg-[#E9522C]/90 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none`}
            >
              Register
            </button>
            {error && (
              <p className="mt-4 text-red-500 text-center bg-red-100 p-2 rounded-md">
                {error}
              </p>
            )}
            {success && (
              <p className="mt-4 text-green-500 text-center bg-green-100 p-2 rounded-md">
                {success}
              </p>
            )}
            <p className="mt-6 text-xs text-gray-600 text-center">
              Already have an account?{" "}
              <Link to="/auth/login">
                <span className="text-[#E9522C] font-semibold">Log in</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
