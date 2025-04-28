import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Menu } from "@headlessui/react";
import {
  Bell,
  CornerDownLeft,
  Heart,
  LogOut,
  ReceiptText,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  Trash2,
  User,
  UserPen,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function DropDownMenu() {
  const { user } = useSelector((state) => state.user || "");
  const { unseenCount } = useSelector((state) => state.notifications);
 
  
  console.log(user)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Handle Cart Navigation
  const handleCart = () => {
    navigate("/cart");
  };

  // Handle Login (example: redirect to login page)
  const handleLogin = () => {
    navigate("/login");
  };

  // Handle Logout (example: clear user from redux & redirect)
  const handleLogout = () => {
    navigate("/");
  };

  const profileMenu = [
    { menu: "Profile", icon: <UserPen />, path: `/profile` },
    { menu: "Orders", icon: <ShoppingBag />, path: `/orders/${user?._id}` },
    { menu: "Wishlist", icon: <Heart />, path: "/wishlist" },
  ];

  const termsAndPrivacy = [
    { menu: "Terms and Conditions", icon: <ReceiptText />, path: "/terms-condition" },
    { menu: "Privacy Policy", icon: <ShieldCheck />, path: "/privacy-policy" },
    { menu: "Return Policy", icon: <CornerDownLeft />, path: "/return-policy" },
    { menu: "Delete Account", icon: <Trash2 />, path: "/account-delete" },
  ];

  return (
    <nav>
      <div className="flex items-center gap-4">
        {/* Cart */}
        <button className="relative" onClick={handleCart}>
          <ShoppingCart size={24} className="text-gray-700 hover:text-blue-500" />
        </button>

        {/* Notifications */}
        <button className="relative" onClick={() => navigate("/notification")}>
              <Bell size={24} className="text-gray-700 hover:text-blue-500" />
              <span
                className={`absolute -top-1 -right-2 rounded-full ${
                  unseenCount > 0
                    ? "bg-red-600 text-white w-5 h-5 text-xs flex items-center justify-center"
                    : "bg-transparent"
                }`}
              >
                {unseenCount > 0 ? unseenCount : null}
              </span>
            </button>

        {/* User Dropdown */}
        {user ? (
          <Menu as="div" className="relative inline-block text-left">
            <Menu.Button className="flex items-center space-x-2">
              <User size={24} className="text-gray-700 hover:text-blue-500" />
              <span className="hidden lg:block text-gray-700 font-medium text-sm sm:text-base">
                {user?.userName}
              </span>
            </Menu.Button>

            <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right bg-white border border-gray-200 rounded-lg shadow-lg focus:outline-none z-50">
              <div className="px-4 py-2 text-sm text-gray-700 font-semibold">My Profile</div>
              {profileMenu.map((menu, index) => (
                <Menu.Item key={index}>
                  {({ active }) => (
                    <button
                      onClick={() => navigate(menu.path)}
                      className={`${
                        active ? "bg-gray-100" : ""
                      } w-full text-left px-4 py-2 text-gray-700 flex items-center space-x-2`}
                    >
                      <span>{menu.icon}</span>
                      <span>{menu.menu}</span>
                    </button>
                  )}
                </Menu.Item>
              ))}

              <hr />
              <div className="px-4 py-2 text-sm text-gray-700 font-semibold">Terms & Privacy</div>
              {termsAndPrivacy.map((menu, index) => (
                <Menu.Item key={index}>
                  {({ active }) => (
                    <button
                      onClick={() => navigate(menu.path)}
                      className={`${
                        active ? "bg-gray-100" : ""
                      } w-full text-left px-4 py-2 text-gray-700 flex items-center space-x-2`}
                    >
                      <span>{menu.icon}</span>
                      <span>{menu.menu}</span>
                    </button>
                  )}
                </Menu.Item>
              ))}

              <hr />
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={handleLogout}
                    className={`${
                      active ? "bg-gray-100" : ""
                    } w-full text-left px-4 py-2 text-red-500 flex items-center space-x-2`}
                  >
                    <LogOut size={18} />
                    <span>Logout</span>
                  </button>
                )}
              </Menu.Item>
            </Menu.Items>
          </Menu>
        ) : (
          <button
            onClick={handleLogin}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
}

export default DropDownMenu;
