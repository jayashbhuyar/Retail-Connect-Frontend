import React, { useEffect, useState } from "react";
import DistributorsNavbar from "../Navbar/DistributorsNavbar";
const MyNetwork = () => {
  const [acceptedRequests, setAcceptedRequests] = useState([]);
  const [error, setError] = useState(null);
  const userEmail = JSON.parse(localStorage.getItem("userdata"))?.email; // Get user email from local storage

  useEffect(() => {
    const fetchAcceptedRequests = async () => {
      if (!userEmail) {
        setError("User email not found. Please log in.");
        return;
      }
      console.log("Fetching accepted requests for email:", userEmail); // Log the email being used
      try {
        const response = await fetch(
          `https://retail-connect-backend.onrender.com/api/network/accepted?email=${userEmail}` // Fetch accepted requests
        );
        const data = await response.json();
        if (response.ok) {
          setAcceptedRequests(data); // Correctly set the accepted requests
        } else {
          setError(data.error || "Failed to fetch accepted requests.");
        }
      } catch (error) {
        setError("An error occurred while fetching accepted requests.");
      }
    };

    fetchAcceptedRequests();
  }, [userEmail]);

  const handleReject = async (id) => {
    try {
      const response = await fetch(
        `https://retail-connect-backend.onrender.com/api/network/reject/status/${id}`, // Update the status of the request
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: "rejected" }), // Set the status to rejected
        }
      );

      const data = await response.json();
      if (response.ok) {
        // Remove the rejected request from the state
        setAcceptedRequests((prevRequests) =>
          prevRequests.filter((request) => request._id !== id)
        );
        alert(data.message || "Request rejected successfully."); // Notify user of success
      } else {
        setError(data.error || "Failed to reject the request.");
      }
    } catch (error) {
      setError("An error occurred while rejecting the request.");
    }
  };

  return (
    <>
   <DistributorsNavbar/>
    <div className="p-6 bg-gray-900 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-gray-100">My Network</h2>
      {error && <p className="text-red-400">{error}</p>}
      {acceptedRequests.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {acceptedRequests.map((request) => (
            <div
              key={request._id}
              className="bg-gradient-to-r from-teal-600 to-blue-600 shadow-lg rounded-lg p-5 flex flex-col relative transition-transform transform hover:scale-105"
            >
              <button
                onClick={() => handleReject(request._id)}
                className="absolute top-3 right-3 text-white hover:text-red-500 transition duration-200"
                aria-label="Delete"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="transition-colors duration-200"
                >
                  <path d="M 10 2 L 9 3 L 3 3 L 3 5 L 21 5 L 21 3 L 15 3 L 14 2 L 10 2 z M 4.3652344 7 L 6.0683594 22 L 17.931641 22 L 19.634766 7 L 4.3652344 7 z"></path>
                </svg>
              </button>
              <h3 className="text-xl font-semibold text-white">
                {request.distributorName}
              </h3>
              <p className="text-gray-300">Email: {request.distributorEmail}</p>
              <p className="text-gray-300">Status: {request.status}</p>
              <h3 className="text-lg font-semibold mt-4 text-white">
                Retailer Info
              </h3>
              <p className="text-gray-300">User Name: {request.userName}</p>
              <p className="text-gray-300">User Email: {request.userEmail}</p>
              <p className="text-gray-300">
                Created At: {new Date(request.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400">No accepted network requests found.</p>
      )}
    </div>
    </>
  );
};

export default MyNetwork;