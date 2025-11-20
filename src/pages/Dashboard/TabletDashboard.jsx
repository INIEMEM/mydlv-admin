import React, { useState, createContext, useContext } from 'react';
import { Card, Button, Avatar, Badge, DatePicker, Input, Form, Progress, Dropdown, Menu } from 'antd';
import { BellOutlined, EyeOutlined, EyeInvisibleOutlined, CalendarOutlined, DownloadOutlined, HomeOutlined, ShoppingOutlined, UserOutlined, EnvironmentOutlined, CustomerServiceOutlined, LogoutOutlined, MenuOutlined } from '@ant-design/icons';
// import { useAuth } from '../../context/AuthContext';
import { MainContext } from '../../context/AuthContext';
import { BottomNavigation } from '../../components/BottomNavigation/BottomNavigation';
import { Outlet } from 'react-router-dom';
export const TabletDashboard = () => {
  const { user } = useContext(MainContext);

  const statsData = [
    { label: 'Account Balance', value: 'N45,500.89', change: '+20%' },
    { label: 'Total Sales', value: '5,000', change: '+20%' },
    { label: 'Active Orders', value: '500.89', change: '+20%' },
    { label: 'Total Users', value: '500.89', change: '+20%' },
    { label: 'Total Vendors', value: '500.89', change: '+20%' },
    { label: 'Total Riders', value: '500.89', change: '+20%' }
  ];

  const orderStatusData = [
    { status: 'New orders', count: 5000, change: '+20%' },
    { status: 'In Progress', count: 100, change: '-20%' },
    { status: 'Completed', count: 100, change: '+20%' },
    { status: 'Rejected', count: 600, change: '+20%' },
    { status: 'Disputed', count: 400, change: '+20%' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="bg-white border-b px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">🌿</span>
            </div>
            <span className="text-2xl font-bold">mydlv</span>
          </div>
          <Badge count={20}>
            <Avatar style={{ backgroundColor: '#1890ff' }}>
              {user?.name?.substring(0, 2).toUpperCase()}
            </Avatar>
          </Badge>
        </div>
      </header>

      <div className="p-6">
        {/* <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Overview</h1>
          <Button size="small">Last 30 days</Button>
        </div>

        <div className="flex gap-3 mb-4">
          <Button size="small" icon={<CalendarOutlined />}>1 Jun 2025 - 20 Jun 2025</Button>
          <Button size="small" icon={<DownloadOutlined />}>Export</Button>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          {statsData.map((stat, idx) => (
            <Card key={idx} size="small">
              <div className="text-xs text-gray-500">{stat.label}</div>
              <div className="text-xs text-green-600 mb-1">{stat.change} Last 30days</div>
              <div className="text-2xl font-bold">{stat.value}</div>
            </Card>
          ))}
        </div>

        <div className="flex gap-3 mb-6 flex-wrap">
          <Badge count={20}>
            <Button type="primary" className="bg-black">Manage Users</Button>
          </Badge>
          <Button type="primary" className="bg-black">Manage Vendors</Button>
          <Button type="primary" className="bg-black">Manage Riders</Button>
        </div>

        <Card title="Track order status" size="small" className="mb-6">
          <div className="grid grid-cols-5 gap-4 text-center">
            {orderStatusData.map((item, idx) => (
              <div key={idx}>
                <div className="text-2xl font-bold">{item.count}</div>
                <div className="text-xs text-gray-500 mt-1">{item.status}</div>
                <div className={`text-xs mt-1 ${item.change.includes('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {item.change}
                </div>
              </div>
            ))}
          </div>
        </Card> */}
        <Outlet/>
      </div>

      <BottomNavigation />
    </div>
  );
};
