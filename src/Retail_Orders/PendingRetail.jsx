import React, { useEffect, useState } from "react";
import axios from "axios";
import RetailerNavbar from "../components/Navbar/RetailerNavbar";
const PendingRetailer = () => {
  const [pendingOrders, setPendingOrders] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const userEmail = localStorage.getItem("userdata")
    ? JSON.parse(localStorage.getItem("userdata")).email
    : null;

  useEffect(() => {
    const fetchPendingOrders = async () => {
      try {
        const response = await axios.get(
          `https://retail-connect-backend.onrender.com/api/orders/pending-by-email?userEmail=${userEmail}`
        );
        setPendingOrders(response.data);
      } catch (err) {
        setError("Failed to fetch pending orders.");
      } finally {
        setLoading(false);
      }
    };

    if (userEmail) {
      fetchPendingOrders();
    }
  }, [userEmail]);

  // #####################################################################################
  // const handleCancelOrder = async (orderId) => {
  //   const reason = prompt("Please enter the reason for cancellation:");
  //   if (reason) {
  //     const message = `Cancelled by Retailer. Reason: ${reason}`;
  //     try {
  //       await axios.patch(
  //         `https://retail-connect-backend.onrender.com/api/orders/retail/status/${orderId}`,
  //         {
  //           status: "cancelled",
  //           msg: message,
  //         }
  //       );
  //       setPendingOrders(
  //         pendingOrders.filter((order) => order._id !== orderId)
  //       );
  //     } catch (err) {
  //       console.error(err);
  //       setError("Failed to cancel the order.");
  //     }
  //   }
  // };

  const handleCancelOrder = async (orderId) => {
    const reason = prompt("Please enter the reason for cancellation:");
    if (reason) {
      const message = `Cancelled by Retailer. Reason: ${reason}`;
  
      try {
        // Cancel the order and retrieve the updated order details
        const response = await axios.patch(`https://retail-connect-backend.onrender.com/api/orders/retail/status/${orderId}`, {
          status: "cancelled",
          msg: message,
        });
  
        const { productId, quantity } = response.data; // Extract productId and quantity from the updated order
  
        // Update the stock of the product using the productId and quantity
        await axios.patch(`https://retail-connect-backend.onrender.com/api/products/update-stock/${productId}`, {
          increment: quantity, // Increment stock by the order quantity
        });
  
        // Update the local state by removing the cancelled order from the list
        setPendingOrders(pendingOrders.filter((order) => order._id !== orderId));
        
      } catch (err) {
        console.error("Error cancelling order or updating stock:", err);
        setError("Failed to cancel the order and update product stock.");
      }
    }
  };
  

  const handleUpdateMessage = async (orderId) => {
    const newMessage = prompt("Please enter the new message:");
    if (newMessage) {
      try {
        await axios.patch(
          `https://retail-connect-backend.onrender.com/api/orders/retail/msg/${orderId}`,
          {
            msg: newMessage,
          }
        );
        const updatedOrders = pendingOrders.map((order) =>
          order._id === orderId ? { ...order, msg: newMessage } : order
        );
        setPendingOrders(updatedOrders);
      } catch (err) {
        console.error(err);
        setError("Failed to update the message.");
      }
    }
  };

  if (loading) {
    return <p>Loading pending orders...</p>;
  }

  return (
    <>
    <RetailerNavbar/>
  
    <div className="container mx-auto p-6 bg-gray-800 min-h-screen">
      <h1 className="text-3xl font-bold text-purple-400 mb-6">Pending Orders</h1>
      {error && <p className="text-red-500">{error}</p>}
      {pendingOrders.length === 0 ? (
        <p className="text-yellow-300">No pending orders found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pendingOrders.map((order) => (
            <div
              key={order._id}
              className="border border-gray-600 p-4 rounded-lg bg-gray-700 shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              <img
                src={order.img}
                alt={order.productName}
                className="w-full h-48 object-contain mb-4 rounded-md"
              />
              <h2 className="text-lg font-semibold text-teal-300">
                {order.productName}
              </h2>
              <p className="text-gray-400">
                <strong>Distributor Name:</strong> {order.distributorName}
              </p>
              <p className="text-gray-400">
                <strong>Distributor Email:</strong> {order.distributorEmail}
              </p>
              <p className="text-gray-400">
                <strong>Quantity:</strong> {order.quantity}
              </p>
              <p className="text-green-400">
                <strong>Price:</strong> ₹ {order.price}
              </p>
              <p className="text-red-500">
                <strong>Status:</strong> {order.status}
              </p>
              <div className="mt-4 flex space-x-2">
                <button
                  onClick={() => handleCancelOrder(order._id)}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500 transition duration-200"
                >
                  Cancel Order
                </button>
                <button
                  onClick={() => handleUpdateMessage(order._id)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition duration-200"
                >
                  Update Message
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>  </>
  );
};

export default PendingRetailer;
