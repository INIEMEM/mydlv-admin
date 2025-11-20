import React, { useState, createContext, useContext } from 'react';
import { Card, Button, Avatar, Badge, DatePicker, Input, Form, Progress, Dropdown, Menu } from 'antd';
import { BellOutlined, EyeOutlined, EyeInvisibleOutlined, CalendarOutlined, DownloadOutlined, HomeOutlined, ShoppingOutlined, UserOutlined, EnvironmentOutlined, CustomerServiceOutlined, LogoutOutlined, MenuOutlined } from '@ant-design/icons';
// import { useAuth } from "../../context/AuthContext";
import { MainContext } from '../../context/AuthContext';
import { BottomNavigation } from '../../components/BottomNavigation/BottomNavigation';
import { Outlet } from 'react-router-dom';
export const MobileDashboard = () => {
  const { user } = useContext(MainContext);

  const statsData = [
    { label: 'Account Balance', value: 'N45,500.89', change: '+20%' },
    { label: 'Total Sales', value: '5,000', change: '+20%' },
    { label: 'Active Orders', value: '500.89', change: '+20%' },
    { label: 'Total Users', value: '500.89', change: '+20%' },
    { label: 'Total Vendors', value: '500.89', change: '+20%' },
    { label: 'Total Riders', value: '500.89', change: '+20%' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="bg-white border-b px-4 py-3">
        <div className="flex items-center justify-between">
          <Avatar style={{ backgroundColor: '#000' }}>
            {user?.name?.substring(0, 2).toUpperCase()}
          </Avatar>
          <div className="flex items-center gap-3">
            <Badge dot>
              <BellOutlined className="text-xl" />
            </Badge>
            <EyeOutlined className="text-xl" />
            <span className="text-sm font-medium">N600,000.00</span>
          </div>
        </div>
      </header>

      <div className="p-4">
        {/* <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold">Overview</h1>
          <Button size="small">Last 30 days</Button>
        </div>

        <div className="flex gap-2 mb-4 text-xs">
          <Button size="small" icon={<CalendarOutlined />}>1 Jun 2025</Button>
          <Button size="small" icon={<DownloadOutlined />}>Export</Button>
        </div>

        <div className="space-y-3 mb-6">
          {statsData.map((stat, idx) => (
            <Card key={idx} size="small">
              <div className="text-xs text-gray-500">{stat.label}</div>
              <div className="text-xs text-green-600 mb-1">{stat.change} Last 30days</div>
              <div className="text-xl font-bold">{stat.value}</div>
            </Card>
          ))}
        </div> */}
        <Outlet/>
      </div>

      <BottomNavigation />
    </div>
  );
};