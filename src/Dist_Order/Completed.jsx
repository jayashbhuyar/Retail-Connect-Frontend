import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DistributorsNavbar from "../components/Navbar/DistributorsNavbar";
import { User, Mail, Phone, Store, Package, DollarSign, MessageCircle, Calendar, AlertCircle, MapPin, Clock,IndianRupeeIcon } from 'lucide-react';

const Completed = () => {
  const [completedOrders, setCompletedOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompletedOrders = async () => {
      const userData = JSON.parse(localStorage.getItem("userdata"));
      const distributorEmail = userData.email;

      if (!distributorEmail) {
        setError("Distributor email not found in local storage.");
        return;
      }

      try {
        const response = await axios.get(
          `https://retail-connect-backend.onrender.com/api/orders/completed`,
          {
            params: {
              distributorEmail, // Include any query parameters needed
            },
            withCredentials: true, // Include credentials (cookies) with the request
          }
        );
        setCompletedOrders(response.data);
      } catch (error) {
        console.error("Error fetching completed orders:", error);
        setError("Failed to fetch completed orders.");
      }
    };

    fetchCompletedOrders();
  }, []);

  if (error) {
    return (
      <div className="bg-gray-900 min-h-screen flex items-center justify-center">
        <div className="bg-red-900 text-red-100 p-4 rounded-lg flex items-center">
          <AlertCircle className="mr-2" />
          <span>{error}</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <DistributorsNavbar />
      <div className="bg-gradient-to-br from-gray-900 to-indigo-900 min-h-screen p-4">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">Completed Orders</h1>
        <div className="max-w-7xl mx-auto grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {completedOrders.map((order) => (
            <div key={order._id} className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <div className="p-3">
                <img className="h-32 w-full object-cover mb-3 rounded-lg" src={order.img} alt={order.productName} />
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-lg font-bold text-indigo-400 truncate">{order.productName}</h2>
                  <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-full">{order.status}</span>
                </div>
                <div className="space-y-1 text-sm">
                  <InfoItem icon={<User className="text-blue-400" />} label="Name" value={order.userName} />
                  <InfoItem icon={<Mail className="text-green-400" />} label="Email" value={order.userEmail} />
                  <InfoItem icon={<Phone className="text-yellow-400" />} label="Phone" value={order.userPhone} />
                  <InfoItem icon={<Store className="text-purple-400" />} label="Shop" value={order.shopName} />
                  <InfoItem icon={<Package className="text-red-400" />} label="Quantity" value={order.quantity} />
                  <InfoItem icon={<IndianRupeeIcon className="text-green-400" />} label="Price" value={`₹ ${order.price}`} />
                  <InfoItem icon={<Calendar className="text-yellow-400" />} label="Delivery Before" value={order.deliveryBefore || 'N/A'} />
                  <InfoItem icon={<Clock className="text-teal-400" />} label="Completed On" value={new Date(order.completedAt).toLocaleString()} />
                  <InfoItem icon={<MessageCircle className="text-blue-400" />} label="Message" value={order.msg} />
                  <InfoItem icon={<AlertCircle className="text-red-400" />} label="Cancel Reason" value={order.orderCancelReason || 'N/A'} />
                  <InfoItem icon={<MapPin className="text-purple-400" />} label="Address" value={order.retailerAddress} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

const InfoItem = ({ icon, label, value }) => (
  <div className="flex items-center truncate">
    <div className="mr-1">{icon}</div>
    <span className="font-medium text-gray-300">{label}:</span>
    <span className="ml-1 text-gray-400 truncate">{value}</span>
  </div>
);

export default Completed;
