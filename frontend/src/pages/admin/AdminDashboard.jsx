import React from 'react'
import Sidbar from './Sidbar'
import { TbDeviceUnknown } from "react-icons/tb";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { GrScorecard } from "react-icons/gr";
import { Outlet } from 'react-router-dom';

function AdminDashboard() {
    const sideMenu = [
        { menu: "Dashboard", icon: <MdOutlineSpaceDashboard />, path: "/dashboard" },
        { menu: "Create Product", icon: <TbDeviceUnknown />, path: "/dashboard/create-product" },
        { menu: "All Products", icon: <GrScorecard />, path: "/dashboard/all-products" },
        { menu: "All Users", icon: <MdOutlineSpaceDashboard />, path: "/dashboard/all-users" },
        { menu: "Users Activity", icon: <TbDeviceUnknown />, path: "/dashboard/users-activity" },
        { menu: "Delete Account", icon: <GrScorecard />, path: "/dashboard/delete-account" }
    ]
    return (
        <div className='flex'>

            <div>
                <Sidbar adminMenus={sideMenu} />
            </div>

            <div>
                <Outlet />

            </div>
        </div>
    )
}

export default AdminDashboard