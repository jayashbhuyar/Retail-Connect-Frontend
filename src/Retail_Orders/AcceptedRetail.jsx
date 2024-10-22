import React, { useEffect, useState } from "react";
import axios from "axios";
import { AlertCircle, MessageCircle, Loader } from "lucide-react";
import RetailerNavbar from "../components/Navbar/RetailerNavbar";

const AcceptedRetail = () => {
  const [acceptedOrders, setAcceptedOrders] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newMessage, setNewMessage] = useState("");
  const [editingOrderId, setEditingOrderId] = useState(null);

  const userEmail = localStorage.getItem("userdata")
    ? JSON.parse(localStorage.getItem("userdata")).email
    : null;

  useEffect(() => {
    const fetchAcceptedOrders = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:8000/api/orders/accepted-by-email?userEmail=${userEmail}`,{
            withCredentials:true
          }
        );
        setAcceptedOrders(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch accepted orders.");
      } finally {
        setLoading(false);
      }
    };

    if (userEmail) {
      fetchAcceptedOrders();
    }
  }, [userEmail]);

  const handleUpdateMessage = (orderId) => {
    setEditingOrderId(orderId);
  };

  const handleSubmitUpdateMessage = async (orderId) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/orders/update-message/${orderId}`,
        { newMessage },{
          withCredentials:true
        }
      );
      console.log(response.data);
      setAcceptedOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, msg: newMessage } : order
        )
      );
      setEditingOrderId(null);
      setNewMessage("");
    } catch (err) {
      console.error("Failed to update the message", err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-r from-purple-900 to-indigo-900">
        <Loader className="animate-spin h-12 w-12 text-purple-400" />
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-purple-900 to-indigo-900 min-h-screen">
      <RetailerNavbar />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-purple-300 mb-8 text-center">Accepted Orders</h1>
        
        {error && (
          <div className="bg-red-900 border-l-4 border-red-500 text-red-100 p-4 mb-6 rounded-r" role="alert">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
              <p>{error}</p>
            </div>
          </div>
        )}

        {acceptedOrders.length === 0 ? (
          <div className="bg-yellow-900 border-l-4 border-yellow-500 text-yellow-100 p-4 mb-6 rounded-r" role="alert">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-yellow-500 mr-2" />
              <p>No accepted orders found.</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {acceptedOrders.map((order) => (
              <div
                key={order._id}
                className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="relative h-48">
                  <img
                    src={order.img}
                    alt={order.productName}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
                    <h2 className="text-xl font-semibold text-white p-4 truncate w-full">
                      {order.productName}
                    </h2>
                  </div>
                </div>
                <div className="p-4 space-y-2 text-sm">
                  <p className="text-purple-300 truncate"><span className="font-medium">Distributor:</span> {order.distributorName}</p>
                  <p className="text-purple-300 truncate"><span className="font-medium">Email:</span> {order.distributorEmail}</p>
                  <p className="text-teal-300"><span className="font-medium">Quantity:</span> {order.quantity}</p>
                  <p className="text-teal-300"><span className="font-medium">Price:</span> ₹ {order.price}</p>
                  <p className="text-green-300"><span className="font-medium">Status:</span> {order.status}</p>
                  <p className="text-gray-300 line-clamp-2 hover:line-clamp-none transition-all duration-300">
                    <span className="font-medium text-purple-300">Message:</span> {order.msg || "No message provided"}
                  </p>
                  
                  <button
                    onClick={() => handleUpdateMessage(order._id)}
                    className="w-full mt-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-200 flex items-center justify-center"
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Update Message
                  </button>

                  {editingOrderId === order._id && (
                    <div className="mt-2 space-y-2">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Enter new message"
                        className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 text-sm"
                      />
                      <button
                        onClick={() => handleSubmitUpdateMessage(order._id)}
                        className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-200 text-sm"
                      >
                        Submit Message
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AcceptedRetail;