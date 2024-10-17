import React, { useEffect, useState } from "react";
import DistributorsNavbar from "../Navbar/DistributorsNavbar";

const RetailerCard = ({ retailer, onMoreInfoClick, onContactDetailsClick }) => {
  const defaultImage = "path/to/default/image.jpg"; // Replace with an actual path to a default image

  return (
    <div className="bg-gray-800 shadow-lg rounded-lg p-4 flex flex-col transition-transform transform hover:scale-100">
      <img
        src={retailer.image || defaultImage} // Use default image if retailer.image is not available
        alt={retailer.name}
        className="h-48 w-full object-cover rounded-t-lg mb-4"
        style={{ objectFit: "cover" }} // Ensure the image covers the space properly
      />
      <div className="px-4">
        <h3 className="text-lg font-bold text-purple-400">{retailer.name}</h3>
        <p className="text-gray-300">Shop Name: {retailer.shopName}</p>
        <p className="text-gray-300">Email: {retailer.email}</p>
        <p className="text-gray-300">Phone: {retailer.phone}</p>
        <p className="text-gray-300">
          Created At: {new Date(retailer.createdAt).toLocaleDateString()}
        </p>
      </div>
      <div className="mt-auto flex space-x-2 p-4">
        <button
          onClick={() => onMoreInfoClick(retailer)} // Pass retailer data to the click handler
          className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 transition duration-200"
        >
          More Info
        </button>
        <button
          onClick={() => onContactDetailsClick(retailer)} // Pass retailer data to the click handler
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-200"
        >
          Contact Details
        </button>
      </div>
    </div>
  );
};

const RetailersList = () => {
  const [retailers, setRetailers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedRetailer, setSelectedRetailer] = useState(null); // State to hold selected retailer for modal
  const [showContactDetails, setShowContactDetails] = useState(false); // State to control contact details modal

  useEffect(() => {
    const fetchRetailers = async () => {
      try {
        const response = await fetch(
          "https://retail-connect-backend.onrender.com/api/users/retailers"
        );
        const data = await response.json();
        if (response.ok) {
          setRetailers(data);
        } else {
          setError(data.error);
        }
      } catch (error) {
        setError("An error occurred while fetching retailers.");
      } finally {
        setLoading(false);
      }
    };

    fetchRetailers();
  }, []);

  const handleRetry = () => {
    setError(null);
    setLoading(true);
    fetchRetailers();
  };

  const handleMoreInfoClick = (retailer) => {
    setSelectedRetailer(retailer); // Set the selected retailer for the modal
  };

  const handleContactDetailsClick = (retailer) => {
    setSelectedRetailer(retailer); // Set the selected retailer for contact details
    setShowContactDetails(true); // Show the contact details modal
  };

  const handleCloseModal = () => {
    setSelectedRetailer(null); // Close the modal
    setShowContactDetails(false); // Close the contact details modal
  };

  return (
    <div className="bg-gray-900 h-screen">
      <DistributorsNavbar />
      <div className="container mx-auto p-4 pt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {loading && (
            <p className="text-blue-500 text-center">Loading retailers...</p>
          )}
          {error && (
            <div className="text-red-500 text-center">
              <p>{error}</p>
              <button onClick={handleRetry} className="text-blue-500 underline">
                Retry
              </button>
            </div>
          )}
          {retailers.map((retailer) => (
            <RetailerCard
              key={retailer._id}
              retailer={retailer}
              onMoreInfoClick={handleMoreInfoClick}
              onContactDetailsClick={handleContactDetailsClick}
            />
          ))}
        </div>
      </div>

      {/* Modal for displaying retailer information */}
      {selectedRetailer && !showContactDetails && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold text-purple-400 mb-4">Retailer Info</h2>
            <p className="text-gray-300">ID: {selectedRetailer._id}</p>
            <p className="text-gray-300">Name: {selectedRetailer.name}</p>
            <p className="text-gray-300">Role: {selectedRetailer.role}</p>
            <p className="text-gray-300">Shop Name: {selectedRetailer.shopName}</p>
            <p className="text-gray-300">Registered On: {new Date(selectedRetailer.createdAt).toLocaleDateString()}</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={handleCloseModal}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for displaying contact details */}
      {selectedRetailer && showContactDetails && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold text-purple-400 mb-4">Contact Details</h2>
            <p className="text-gray-300">Email: {selectedRetailer.email}</p>
            <p className="text-gray-300">Phone: {selectedRetailer.phone}</p>
            <p className="text-gray-300">Address: {selectedRetailer.address}</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={handleCloseModal}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RetailersList;