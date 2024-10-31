import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie"; 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("retailer"); // Default role
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state

  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const validateToken = async () => {
      try {
        const response = await fetch("https://retail-connect-backend.onrender.com/api/validate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          const userData = JSON.parse(localStorage.getItem('userdata'));
          if (userData) {
            if (userData.role === "distributor") {
              navigate("/homepage");
            } else if (userData.role === "retailer") {
              navigate("/homepageretailer");
            } else if (userData.role === "admin") {
              navigate("/adminhome");
            }
          }
        } else {
          Cookies.remove("token");
        }
      } catch (error) {
        console.error("Token validation failed:", error);
      }
    };

    validateToken();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true); // Start loading

    const loginData = { email, password, role };

    try {
      const response = await fetch("https://retail-connect-backend.onrender.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(data.message);
        setEmail(""); // Clear email
        setPassword(""); // Clear password
        Cookies.set("token", data.token, { expires: 30, sameSite: "strict" });
        localStorage.setItem('userdata', JSON.stringify(data.user));

        // Redirect based on user role
        if (data.user.role === "distributor") {
          navigate("/homepage");
        } else if (data.user.role === "retailer") {
          navigate("/homepageretailer");
        } else if (data.user.role === "admin") {
          navigate("/adminhome");
        }
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("An error occurred while logging in.");
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div className="bg-sky-100 flex justify-center items-center h-screen">
      <div className="w-1/2 h-screen hidden lg:block">
        <img
          src="https://img.freepik.com/fotos-premium/imagen-fondo_910766-187.jpg?w=826"
          alt="Placeholder"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="lg:p-36 md:p-52 sm:p-20 p-8 w-full lg:w-1/2">
        <h1 className="text-2xl font-semibold mb-4">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-4">
            <label className="block text-gray-600">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              autoComplete="off"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-800">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              autoComplete="off"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Role:</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
            >
              <option value="retailer">Retailer</option>
              <option value="distributor">Distributor</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-red-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
        {success && (
          <p className="mt-4 text-green-500 text-center">{success}</p>
        )}
        <div className="mt-6 text-center text-gray-600">
          New user?{" "}
          <Link to="/auth/signup" className="text-blue-500 hover:underline">
            Sign up Here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;