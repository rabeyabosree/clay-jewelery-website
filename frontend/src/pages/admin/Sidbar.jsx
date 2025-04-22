import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "./../../components/common/Logo";
import { LuCircleUserRound } from "react-icons/lu";

function Sidbar({ adminMenus }) {
    const { user } = useSelector((state) => state.user)
    const location = useLocation();
    const navigate = useNavigate()

    return (
        <div className="h-screen w-64 bg-white shadow-lg flex flex-col justify-between p-4">
            {/* Logo Section */}
            <div>
                <Logo />
            </div>

            {/* Menu Section */}
            <div className="flex-1 mt-6 space-y-2">
                {adminMenus.map((menu) => {
                    const isActive = location.pathname === menu.path;
                    return (
                        <Link
                            key={menu.menu}
                            to={menu.path}
                            className={`flex items-center gap-3 px-4 py-2 rounded-md text-gray-700 hover:bg-blue-100 transition duration-150 ${isActive ? "bg-blue-500 text-white" : ""
                                }`}
                        >
                            <span className="text-xl">{menu.icon}</span>
                            <span className="text-sm font-medium">{menu.menu}</span>
                        </Link>
                    );
                })}
            </div>

            {/* Profile Section */}
            <div
                className={`cursor-pointer border-t pt-4 flex items-center gap-3 px-4 py-2 rounded-md text-gray-700 hover:bg-blue-100 transition duration-150 ${location.pathname === "/dashboard/profile" ? "bg-blue-500 text-white" : ""
                    }`}
                onClick={() => navigate("/dashboard/profile")}
            >
                <LuCircleUserRound className="text-xl" />
                <h1 className="text-sm font-medium">{user?.name || "Profile"}</h1>
            </div>

        </div>
    );
}

export default Sidbar;
