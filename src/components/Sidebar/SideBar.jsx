import React from "react";
import {
  HomeOutlined,
  ShoppingOutlined,
  UserOutlined,
  EnvironmentOutlined,
  CustomerServiceOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";

export const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Define sidebar menu items
  const menuItems = [
    { label: "Dashboard", icon: <HomeOutlined />, path: "/" },
    { label: "Orders", icon: <ShoppingOutlined />, path: "/orders" },
    { label: "Account", icon: <UserOutlined />, path: "/account" },
    { label: "My Stores", icon: <EnvironmentOutlined />, path: "/stores" },
    { label: "Support", icon: <CustomerServiceOutlined />, path: "/support" },
  ];

  return (
    <aside className="w-64 bg-white border-r min-h-screen p-4 fixed top-16">
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 font-medium transition-colors duration-200 ${
                isActive
                  ? "bg-[#e8e8e8] text-gray-800"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
};
