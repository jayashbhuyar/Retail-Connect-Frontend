// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// // import DistributorsNavbar from "../components/Navbar/DistributorsNavbar";
// import DistributorsNavbar from "../components/Navbar/DistributorsNavbar";

// const Pending = () => {
//   const [orders, setOrders] = useState([]);
//   const [error, setError] = useState(null);
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [showRejectForm, setShowRejectForm] = useState(false);
//   const [currentOrder, setCurrentOrder] = useState(null);
//   const [deliveryDate, setDeliveryDate] = useState(null);
//   const [rejectionReason, setRejectionReason] = useState("");

//   useEffect(() => {
//     const fetchOrders = async () => {
//       const userData = JSON.parse(localStorage.getItem("userdata"));
//       const distributorEmail = userData?.email;

//       if (!distributorEmail) {
//         setError("Distributor email is not set in local storage.");
//         return;
//       }

//       try {
//         const response = await axios.get(
//           `http://localhost:8000/api/orders/pending?distributorEmail=${distributorEmail}`
//         );

//         if (response.data && response.data.length > 0) {
//           setOrders(response.data);
//         } else {
//           setError("No pending orders found.");
//         }
//       } catch (error) {
//         console.error("Error fetching orders:", error);

//         if (error.response && error.response.status === 404) {
//           setError("No pending orders found.");
//         } else {
//           setError("Failed to fetch orders. Please try again later.");
//         }
//       }
//     };

//     fetchOrders();
//   }, []);

//   const handleAcceptClick = (order) => {
//     setCurrentOrder(order);
//     setShowDatePicker(true);
//   };

//   // const acceptOrder = async () => {
//   //   if (!deliveryDate) {
//   //     setError("Please select a delivery date.");
//   //     return;
//   //   }

//   //   try {
//   //     await axios.patch(`http://localhost:8000/api/orders/status/${currentOrder._id}`, {
//   //       status: "accepted",
//   //       deliveryBefore: deliveryDate.toISOString(),
//   //     });

//   //     setOrders((prevOrders) => prevOrders.filter((order) => order._id !== currentOrder._id));
//   //     setShowDatePicker(false);
//   //     setCurrentOrder(null);
//   //     setDeliveryDate(null);
//   //   } catch (error) {
//   //     console.error("Error accepting order:", error);
//   //     setError("Failed to accept the order. Please try again later.");
//   //   }
//   // };

//   // const handleRejectClick = (order) => {
//   //   setCurrentOrder(order);
//   //   setShowRejectForm(true);
//   // };

//   // const handleRejectSubmit = async (e) => {
//   //   e.preventDefault();
//   //   if (!rejectionReason) {
//   //     setError("Please provide a reason for rejection.");
//   //     return;
//   //   }

//   //   try {
//   //     await axios.patch(`http://localhost:8000/api/orders/status/${currentOrder._id}`, {
//   //       status: "rejected",
//   //       orderCancelReason: rejectionReason,
//   //     });

//   //     setOrders((prevOrders) => prevOrders.filter((order) => order._id !== currentOrder._id));
//   //     setShowRejectForm(false);
//   //     setCurrentOrder(null);
//   //     setRejectionReason("");
//   //   } catch (error) {
//   //     console.error("Error rejecting order:", error);
//   //     setError("Failed to reject the order. Please try again later.");
//   //   }
//   // };

//   // const handleRejectSubmit = async (e) => {
//   //   e.preventDefault();
//   //   if (!rejectionReason) {
//   //     setError("Please provide a reason for rejection.");
//   //     return;
//   //   }

//   //   try {
//   //     // Reject the order first
//   //     await axios.patch(`http://localhost:8000/api/orders/status/${currentOrder._id}`, {
//   //       status: "rejected",
//   //       orderCancelReason: rejectionReason,
//   //     });

//   //     // Update the stock in the Product model
//   //     // const objectId = new ObjectId(productId);
//   //     console.log(productId)
//   //     const { productId, quantity } = currentOrder; // Get productId and quantity from the current order
//   //     await axios.patch(`http://localhost:8000/api/products/update-stock/${productId}`, {
//   //       increment: quantity, // Send quantity to be added back to stock
//   //     });

//   //     // Update the orders list by removing the rejected order
//   //     setOrders((prevOrders) => prevOrders.filter((order) => order._id !== currentOrder._id));
//   //     setShowRejectForm(false);
//   //     setCurrentOrder(null);
//   //     setRejectionReason("");
//   //   } catch (error) {
//   //     console.error("Error rejecting order:", error);
//   //     setError("Failed to reject the order. Please try again later.");
//   //   }
//   // };

//   const acceptOrder = async () => {
//     if (!deliveryDate) {
//       setError("Please select a delivery date.");
//       return;
//     }

//     try {
//       // Step 1: Update order status to 'accepted'
//       await axios.patch(
//         `http://localhost:8000/api/orders/status/${currentOrder._id}`,
//         {
//           status: "accepted",
//           deliveryBefore: deliveryDate.toISOString(),
//         }
//       );

//       // Step 2: Fetch the product details from the Product model
//       const productResponse = await axios.get(
//         `http://localhost:8000/api/products/${currentOrder.productId}`
//       );
//       const productData = productResponse.data;

//       const orderresponse = await axios.get(
//         `http://localhost:8000/api/orders/getdata/${currentOrder._id}`
//       );

//       const orderData = orderresponse.data;

//       // Step 3: Fetch distributor details from localStorage (or another source)
//       const distributorData = JSON.parse(localStorage.getItem("userdata"));

//       if (!distributorData) {
//         setError("Distributor data is not available.");
//         return;
//       }
//       const invoiceData = {
//         invoiceNo: Math.floor(Math.random() * 1000000).toString(), // Ensure this is a string
//         distributorName: distributorData.name,
//         distributorEmail: distributorData.email,
//         distributorPhone: distributorData.phone,
//         distributorAddress: distributorData.address,
//         companyName: distributorData.companyName,
//         retailerName: currentOrder.userName,
//         retailerEmail: currentOrder.userEmail,
//         retailerPhone: currentOrder.userPhone,
//         shopName: currentOrder.shopName,
//         retailerAddress: currentOrder.retailerAddress,
//         orderStatus: "accepted",
//         productName: orderData.productName,
//         quantity: orderData.quantity,
//         price: orderData.price,
//         productDescription: productData.description,
//         productImage: orderData.img,
//         qrCodeImage: distributorData.qrCodeImage,
//         netAmount: orderData.quantity * orderData.price,
//         authorizedSignature: orderData.distributorName,
//         deliveryBefore: deliveryDate.toISOString(), // Including delivery date in the invoice
//       };
      
//       // Send the invoice data to the API
//       await axios.post("http://localhost:8000/api/invoices", invoiceData);
      
      
    

//       // Step 6: Remove the accepted order from the list
//       setOrders((prevOrders) =>
//         prevOrders.filter((order) => order._id !== currentOrder._id)
//       );
//       setShowDatePicker(false);
//       setCurrentOrder(null);
//       setDeliveryDate(null);
//     } catch (error) {
//       console.error("Error accepting order:", error);
//       setError(
//         "Failed to accept the order and generate invoice. Please try again later."
//       );
//     }
//   };

//   const handleRejectClick = (order) => {
//     setCurrentOrder(order); // Make sure this order contains productId
//     setShowRejectForm(true);
//   };

//   const handleRejectSubmit = async (e) => {
//     e.preventDefault();
//     if (!rejectionReason) {
//       setError("Please provide a reason for rejection.");
//       return;
//     }

//     try {
//       // Reject the order first
//       await axios.patch(
//         `http://localhost:8000/api/orders/status/${currentOrder._id}`,
//         {
//           status: "rejected",
//           orderCancelReason: rejectionReason,
//         }
//       );

//       // Extract productId and quantity from the currentOrder
//       const { productId, quantity } = currentOrder;

//       // Update the stock in the Product model
//       await axios.patch(
//         `http://localhost:8000/api/products/update-stock/${productId}`,
//         {
//           increment: quantity, // Send quantity to be added back to stock
//         }
//       );

//       // Update the orders list by removing the rejected order
//       setOrders((prevOrders) =>
//         prevOrders.filter((order) => order._id !== currentOrder._id)
//       );
//       setShowRejectForm(false);
//       setCurrentOrder(null);
//       setRejectionReason("");
//     } catch (error) {
//       console.error("Error rejecting order:", error);
//       setError("Failed to reject the order. Please try again later.");
//     }
//   };

//   return (
//     <>
//       <DistributorsNavbar />
//       <div className="bg-black min-h-screen">
//         {" "}
//         {/* Changed background to black */}
//         <div className="container mx-auto p-6 bg-gray-800">
//           <h1 className="text-3xl font-bold text-purple-400 mb-6 text-center">
//             Pending Orders
//           </h1>
//           {error && <p className="text-red-500 text-center">{error}</p>}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {orders.map((order) => (
//               <div
//                 key={order._id}
//                 className="border border-gray-600 p-4 rounded-lg bg-gray-700 shadow-lg hover:shadow-2xl transition-shadow duration-300"
//               >
//                 <img
//                   src={order.img}
//                   alt={order.productName}
//                   className="w-full h-32 object-cover rounded-md mb-4"
//                 />
//                 <h2 className="text-lg font-semibold text-teal-300">
//                   {order.productName}
//                 </h2>
//                 <p className="text-gray-400">Ordered by: {order.userName}</p>
//                 <p className="text-gray-400">Email: {order.userEmail}</p>
//                 <p className="text-gray-400">Phone: {order.userPhone}</p>
//                 <p className="text-gray-400">Shop Name: {order.shopName}</p>
//                 <p className="font-bold text-xl mt-2">Price: ${order.price}</p>
//                 <p className="text-gray-400">Quantity: {order.quantity}</p>
//                 <p className="text-gray-400">
//                   Address: {order.retailerAddress}
//                 </p>
//                 <p className="text-orange-500">Msg : {order.msg}</p>
//                 <div className="flex justify-between mt-4">
//                   <button
//                     onClick={() => handleAcceptClick(order)}
//                     className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-500 transition duration-200"
//                   >
//                     Accept
//                   </button>
//                   <button
//                     onClick={() => handleRejectClick(order)}
//                     className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500 transition duration-200"
//                   >
//                     Reject
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {showDatePicker && (
//             <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
//               <div className="bg-gray-800 p-6 rounded shadow-md w-80">
//                 <h2 className="text-lg font-semibold mb-4">
//                   Select Delivery Date
//                 </h2>
//                 <DatePicker
//                   selected={deliveryDate}
//                   onChange={(date) => setDeliveryDate(date)}
//                   minDate={new Date()}
//                   placeholderText="Select a delivery date"
//                   className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
//                 />
//                 <div className="flex justify-end mt-4">
//                   <button
//                     onClick={acceptOrder}
//                     className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500 transition duration-200"
//                   >
//                     Submit
//                   </button>
//                   <button
//                     className="ml-2 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-500 transition duration-200"
//                     onClick={() => setShowDatePicker(false)}
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}

//           {showRejectForm && (
//             <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
//               <div className="bg-gray-800 p-6 rounded shadow-md w-80">
//                 <h2 className="text-lg font-semibold mb-4">
//                   Reason for Rejection
//                 </h2>
//                 <form onSubmit={handleRejectSubmit}>
//                   <textarea
//                     className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
//                     placeholder="Enter rejection reason"
//                     value={rejectionReason}
//                     onChange={(e) => setRejectionReason(e.target.value)}
//                   ></textarea>
//                   <div className="flex justify-end mt-4">
//                     <button
//                       type="submit"
//                       className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500 transition duration-200"
//                     >
//                       Submit
//                     </button>
//                     <button
//                       className="ml-2 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-500 transition duration-200"
//                       onClick={() => setShowRejectForm(false)}
//                     >
//                       Cancel
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Pending;


// **********************************************************************
import React, { useEffect, useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DistributorsNavbar from "../components/Navbar/DistributorsNavbar";

const Pending = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showRejectForm, setShowRejectForm] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [deliveryDate, setDeliveryDate] = useState(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [qrCodeLink, setQrCodeLink] = useState(""); // New state for QR code link

  useEffect(() => {
    const fetchOrders = async () => {
      const userData = JSON.parse(localStorage.getItem("userdata"));
      const distributorEmail = userData?.email;

      if (!distributorEmail) {
        setError("Distributor email is not set in local storage.");
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:8000/api/orders/pending?distributorEmail=${distributorEmail}`,{
             withCredentials: true,
          }
          
        );

        if (response.data && response.data.length > 0) {
          setOrders(response.data);
        } else {
          setError("No pending orders found.");
        }
      } catch (error) {
        console.error("Error fetching orders:", error);

        if (error.response && error.response.status === 404) {
          setError("No pending orders found.");
        } else {
          setError("Failed to fetch orders. Please try again later.");
        }
      }
    };

    fetchOrders();
  }, []);

  const handleAcceptClick = (order) => {
    setCurrentOrder(order);
    setShowDatePicker(true);
    setQrCodeLink(""); // Reset QR code link when opening the form
  };

  const acceptOrder = async () => {
    if (!deliveryDate) {
      setError("Please select a delivery date.");
      return;
    }

    if (!qrCodeLink) {
      setError("Please provide a QR code link for payment.");
      return;
    }

    try {
      // Step 1: Update order status to 'accepted'
       await axios.patch(
        `http://localhost:8000/api/orders/status/${currentOrder._id}`,
        {
          status: "accepted",
          deliveryBefore: deliveryDate.toISOString(),
        },
        {
          withCredentials: true, // Include credentials (cookies) with the request
        }
      );

      // Step 2: Fetch the product details from the Product model
      const productResponse = await axios.get(
        `http://localhost:8000/api/products/${currentOrder.productId}`,
        {
          withCredentials: true, // Include credentials (cookies) with the request
        }
      );
      const productData = productResponse.data;
      
      const orderResponse = await axios.get(
        `http://localhost:8000/api/orders/getdata/${currentOrder._id}`,
        {
          withCredentials: true, // Include credentials (cookies) with the request
        }
      );
      const orderresponse = await axios.get(
        `http://localhost:8000/api/orders/getdata/${currentOrder._id}`,{
          withCredentials: true,
        }
      );

      const orderData = orderresponse.data;

      // Step 3: Fetch distributor details from localStorage
      const distributorData = JSON.parse(localStorage.getItem("userdata"));

      if (!distributorData) {
        setError("Distributor data is not available.");
        return;
      }

      const invoiceData = {
        invoiceNo: Math.floor(Math.random() * 1000000).toString(),
        distributorName: distributorData.name,
        distributorEmail: distributorData.email,
        distributorPhone: distributorData.phone,
        distributorAddress: distributorData.address,
        companyName: distributorData.companyName,
        retailerName: currentOrder.userName,
        retailerEmail: currentOrder.userEmail,
        retailerPhone: currentOrder.userPhone,
        shopName: currentOrder.shopName,
        retailerAddress: currentOrder.retailerAddress,
        orderStatus: "accepted",
        productName: orderData.productName,
        quantity: orderData.quantity,
        price: orderData.price,
        productDescription: productData.description,
        productImage: orderData.img,
        qrCodeImage: qrCodeLink, // Use the QR code link provided by the user
        netAmount: orderData.quantity * orderData.price,
        authorizedSignature: orderData.distributorName,
        deliveryBefore: deliveryDate.toISOString(),
      };
      
      // Send the invoice data to the API
      // await axios.post("http://localhost:8000/api/invoices", invoiceData);
      await axios.post(
        "http://localhost:8000/api/invoices",
        invoiceData,
        {
          withCredentials: true, // Include credentials (cookies) with the request
        }
      );
      

      // Step 6: Remove the accepted order from the list
      setOrders((prevOrders) =>
        prevOrders.filter((order) => order._id !== currentOrder._id)
      );
      setShowDatePicker(false);
      setCurrentOrder(null);
      setDeliveryDate(null);
      setQrCodeLink(""); // Reset QR code link after accepting the order
    } catch (error) {
      console.error("Error accepting order:", error);
      setError(
        "Failed to accept the order and generate invoice. Please try again later."
      );
    }
  };

  const handleRejectClick = (order) => {
    setCurrentOrder(order);
    setShowRejectForm(true);
  };

  const handleRejectSubmit = async (e) => {
    e.preventDefault();
    if (!rejectionReason) {
      setError("Please provide a reason for rejection.");
      return;
    }

    try {
      // Reject the order first
      await axios.patch(
        `http://localhost:8000/api/orders/status/${currentOrder._id}`,
        {
          status: "rejected",
          orderCancelReason: rejectionReason,
        },
        {
          withCredentials: true, // Include credentials (cookies) with the request
        }
      );
      

      // Extract productId and quantity from the currentOrder
      const { productId, quantity } = currentOrder;

      // Update the stock in the Product model
      await axios.patch(
        `http://localhost:8000/api/products/update-stock/${productId}`,
        {
          increment: quantity, // Send quantity to be added back to stock
        },
        {
          withCredentials: true, // Include credentials (cookies) with the request
        }
      );
      
      

      // Update the orders list by removing the rejected order
      setOrders((prevOrders) =>
        prevOrders.filter((order) => order._id !== currentOrder._id)
      );
      setShowRejectForm(false);
      setCurrentOrder(null);
      setRejectionReason("");
    } catch (error) {
      console.error("Error rejecting order:", error);
      setError("Failed to reject the order. Please try again later.");
    }
  };

  return (
    <>
      <DistributorsNavbar />
      <div className="bg-black min-h-screen">
        <div className="container mx-auto p-6 bg-gray-800">
          <h1 className="text-3xl font-bold text-purple-400 mb-6 text-center">
            Pending Orders
          </h1>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="border border-gray-600 p-4 rounded-lg bg-gray-700 shadow-lg hover:shadow-2xl transition-shadow duration-300"
              >
                <img
                  src={order.img}
                  alt={order.productName}
                  className="w-full h-32 object-cover rounded-md mb-4"
                />
                <h2 className="text-lg font-semibold text-teal-300">
                  {order.productName}
                </h2>
                <p className="text-white">Ordered by: {order.userName}</p>
                <p className="text-white">Email: {order.userEmail}</p>
                <p className="text-white">Phone: {order.userPhone}</p>
                <p className="text-white">Shop Name: {order.shopName}</p>
                <p className="font-bold text-xl text-green-400 mt-2">Price: ₹ {order.price}</p>
                <p className="text-white">Quantity: {order.quantity}</p>
                <p className="text-white">
                  Address: {order.retailerAddress}
                </p>
                <p className="text-orange-600">Msg : {order.msg}</p>
                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => handleAcceptClick(order)}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-500 transition duration-200"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleRejectClick(order)}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500 transition duration-200"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>

          {showDatePicker && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
              <div className="bg-gray-800 p-6 rounded shadow-md w-80">
                <h2 className="text-lg font-semibold mb-4">
                  Accept Order
                </h2>
                <DatePicker
                  selected={deliveryDate}
                  onChange={(date) => setDeliveryDate(date)}
                  minDate={new Date()}
                  placeholderText="Select a delivery date"
                  className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white mb-4"
                />
                <input
                  type="text"
                  value={qrCodeLink}
                  onChange={(e) => setQrCodeLink(e.target.value)}
                  placeholder="Enter QR code link for payment"
                  className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white mb-4"
                />
                <div className="flex justify-end mt-4">
                  <button
                    onClick={acceptOrder}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500 transition duration-200"
                  >
                    Submit
                  </button>
                  <button
                    className="ml-2 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-500 transition duration-200"
                    onClick={() => setShowDatePicker(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {showRejectForm && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
              <div className="bg-gray-800 p-6 rounded shadow-md w-80">
                <h2 className="text-lg font-semibold mb-4">
                  Reason for Rejection
                </h2>
                <form onSubmit={handleRejectSubmit}>
                  <textarea
                    className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
                    placeholder="Enter rejection reason"
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                  ></textarea>
                  <div className="flex justify-end mt-4">
                    <button
                      type="submit"
                      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500 transition duration-200"
                    >
                      Submit
                    </button>
                    <button
                      className="ml-2 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-500 transition duration-200"
                      onClick={() => setShowRejectForm(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Pending;
