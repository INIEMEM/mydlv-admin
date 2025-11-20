import React, { useState, createContext, useContext } from 'react';
import { Card, Button, Avatar, Badge, DatePicker, Input, Form, Progress, Dropdown, Menu } from 'antd';
import { BellOutlined, EyeOutlined, EyeInvisibleOutlined, CalendarOutlined, DownloadOutlined, HomeOutlined, ShoppingOutlined, UserOutlined, EnvironmentOutlined, CustomerServiceOutlined, LogoutOutlined, MenuOutlined } from '@ant-design/icons';
export const BottomNavigation = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t">
      <div className="flex justify-around py-3">
        <button className="flex flex-col items-center gap-1">
          <HomeOutlined className="text-lg" />
          <span className="text-xs">my stores</span>
        </button>
        <button className="flex flex-col items-center gap-1">
          <UserOutlined className="text-lg" />
          <span className="text-xs">Account</span>
        </button>
        <button className="flex flex-col items-center gap-1">
          <HomeOutlined className="text-lg text-blue-600" />
          <span className="text-xs text-blue-600">Dashboard</span>
          <div className="w-12 h-1 bg-blue-600 rounded-full"></div>
        </button>
        <button className="flex flex-col items-center gap-1">
          <ShoppingOutlined className="text-lg" />
          <span className="text-xs">Orders</span>
        </button>
        <button className="flex flex-col items-center gap-1">
          <CustomerServiceOutlined className="text-lg" />
          <span className="text-xs">Support</span>
        </button>
      </div>
    </div>
  );
};
