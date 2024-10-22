import { useState, useEffect } from "react";
import {
  Bars3Icon,
  BellIcon,
  XMarkIcon,
  ChevronDownIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Cookies from 'js-cookie';


const RetailerNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileProductDropdownOpen, setIsMobileProductDropdownOpen] = useState(false);
  const [isOrdersDropdownOpen, setIsOrdersDropdownOpen] = useState(false);
  const [isMobileOrdersDropdownOpen, setIsMobileOrdersDropdownOpen] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedUserData = localStorage.getItem("userdata");
    if (storedUserData) {
      try {
        const parsedUserData = JSON.parse(storedUserData);
        setUserData(parsedUserData);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);
  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleProductDropdown = () => setIsProductDropdownOpen(!isProductDropdownOpen);
  const toggleMobileProductDropdown = () => setIsMobileProductDropdownOpen(!isMobileProductDropdownOpen);
  const toggleOrdersDropdown = () => setIsOrdersDropdownOpen(!isOrdersDropdownOpen);
  const toggleMobileOrdersDropdown = () => setIsMobileOrdersDropdownOpen(!isMobileOrdersDropdownOpen);

  const handleLogout = async () => {
    try {
      // Optionally, notify the server to invalidate the token (if token invalidation is needed)
      await fetch('https://retail-connect-backend.onrender.com/api/auth/logout', {
        method: 'POST',
        credentials: 'include', // Include credentials (cookies) in the request
      });
  
      // Remove the JWT token from the cookies
      Cookies.remove('token', { secure: true, sameSite: 'strict' });
      localStorage.removeItem('userdata');
  
      // Redirect to login page
      window.location.href = '/auth/login';
    } catch (error) {
      console.error("Error during logout:", error);
      // Optionally, show an error notification to the user
    }
  };

  return (
    <nav className="bg-gray-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-25">
          <div className="flex-shrink-0">
            <Link to="/homepageretailer">
              <img
                className="h-14 w-auto max-w-full"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1k4OmmdnQ9swvTRpaJML0CkWzJrg7XMO_JsqTl9xlCDzgftvgyiFeHPn56qZhxzzInA&usqp=CAU"
                alt="Your Company"
              />
            </Link>
          </div>
          <div className="hidden sm:block">
            <Link
              to="/retailerNetwork"
              className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out"
            >
              {/* Y're {userData && userData.role} */}
              Your Network
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden sm:flex sm:space-x-6">
            <Link
              to="/distributorslist"
              className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out"
            >
              Distributors
            </Link>

            {/* Product Dropdown */}
            <div className="relative">
              <button
                onClick={toggleProductDropdown}
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out flex items-center"
              >
                Products <ChevronDownIcon className="w-5 h-5 ml-1" />
              </button>
              {isProductDropdownOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
                  <Link
                    to="/latestproduct"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    New Product
                  </Link>
                  <Link
                    to="/productlistall"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    All Products
                  </Link>
                </div>
              )}
            </div>

            {/* Orders Dropdown */}
            <div className="relative">
              <button
                onClick={toggleOrdersDropdown}
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out flex items-center"
              >
                Orders <ChevronDownIcon className="w-5 h-5 ml-1" />
              </button>
              {isOrdersDropdownOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
                  <Link
                    to="/pendingretail"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Pending Orders
                  </Link>
                  <Link
                    to="/acceptedretail"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Accepted Orders
                  </Link>
                  <Link
                    to="/rejectedretail"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Rejected Orders
                  </Link>
                  <Link
                    to="/completedretail"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Completed Orders
                  </Link>
                </div>
              )}
            </div>
            <Link
              to="/invoicepage"
              className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out"
            >
              Invoices
            </Link>
            <Link
              to="/about"
              className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out"
            >
              About
            </Link>
            <Link
              to="/complaintandreview"
              className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out"
            >
              Complaint
            </Link>
          </div>

          {/* Mobile Menu Button and User Menu */}
          <div className="flex items-center space-x-4">
            <div className="hidden sm:block">
              <Link to="/newsfeed">
                <button
                  type="button"
                  className="bg-gray-800 p-2 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </Link>
            </div>

            <div className="relative">
              <button
                type="button"
                className="bg-gray-800 flex items-center justify-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                id="user-menu-button"
                aria-expanded={isUserMenuOpen}
                aria-haspopup="true"
                onClick={toggleUserMenu}
              >
                <span className="sr-only">Open user menu</span>
                {userData && userData.image ? (
                  <img
                    className="h-8 w-8 rounded-full"
                    src={userData.image}
                    alt="User"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://via.placeholder.com/40";
                    }}
                  />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-gray-500 flex items-center justify-center text-white">
                    {userData && userData.firstName ? (
                      userData.firstName.charAt(0).toUpperCase()
                    ) : (
                      <UserCircleIcon className="h-6 w-6" aria-hidden="true" />
                    )}
                  </div>
                )}
              </button>
              {isUserMenuOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                  <div className="px-4 py-2 text-sm text-gray-700">
                    {userData
                      ? `${userData.name || "Guest"} ${userData.lastName || ""}`
                      : "Guest"}
                  </div>
                  <div className="px-4 py-2 text-xs text-gray-500">
                    {userData?.email || "No email"}
                  </div>
                  <div className="px-4 py-2 text-xs text-gray-500">
                    {userData?.companyName || userData?.shopName || ""}
                  </div>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Your Profile
                  </Link>
                  <Link
                    to="/settings"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Settings
                  </Link>
                  <Link
                    to="/settings"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                         {userData && userData.role} 
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
      
            <div className="sm:hidden">
              <button
                onClick={toggleMenu}
                className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              >
                <span className="sr-only">Open main menu</span>
                {isOpen ? (
                  <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.2 }}
          className="sm:hidden"
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/retailerNetwork"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              {/* Y're {userData && userData.role} */}
              Your Network
            </Link>
            <Link
              to="/distributorslist"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Distributors
            </Link>

            {/* Mobile Product Dropdown */}
            <div>
              <button
                onClick={toggleMobileProductDropdown}
                className="text-gray-300 hover:bg-gray-700 hover:text-white block w-full text-left px-3 py-2 rounded-md text-base font-medium"
              >
                Products <ChevronDownIcon className="w-5 h-5 inline" />
              </button>
              {isMobileProductDropdownOpen && (
                <div className="pl-6 space-y-1">
                  <Link
                    to="/latestproduct"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  >
                    New Product
                  </Link>
                  <Link
                    to="/productlistall"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  >
                    All Products
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Orders Dropdown */}
            <div>
              <button
                onClick={toggleMobileOrdersDropdown}
                className="text-gray-300 hover:bg-gray-700 hover:text-white block w-full text-left px-3 py-2 rounded-md text-base font-medium"
              >
                Orders <ChevronDownIcon className="w-5 h-5 inline" />
              </button>
              {isMobileOrdersDropdownOpen && (
                <div className="pl-6 space-y-1">
                  <Link
                    to="/pendingretail"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  >
                    Pending Orders
                  </Link>
                  <Link
                    to="/acceptedretail"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  >
                    Accepted Orders
                  </Link>
                  <Link
                    to="/rejectedretail"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  ></Link>
                  <Link
                    to="/rejectedretail"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  >
                    Rejected Orders
                  </Link>
                  <Link
                    to="/completedretail"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  >
                    Completed Orders
                  </Link>
                </div>
              )}
            </div>

            <Link
              to="/invoicepage"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Invoices
            </Link>
            <Link
              to="/about"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              About
            </Link>
            <Link
              to="/complaintandreview"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Complaint
            </Link>
            <Link
              to="/newsfeed"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Notifications
            </Link>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default RetailerNavbar;