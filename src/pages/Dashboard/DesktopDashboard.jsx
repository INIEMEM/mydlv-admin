import React, { useState, createContext, useContext } from 'react';
import { Card, Button, Avatar, Badge, DatePicker, Input, Form, Progress, Dropdown, Menu } from 'antd';
import { BellOutlined, EyeOutlined, EyeInvisibleOutlined, CalendarOutlined, DownloadOutlined, HomeOutlined, ShoppingOutlined, UserOutlined, EnvironmentOutlined, CustomerServiceOutlined, LogoutOutlined, MenuOutlined } from '@ant-design/icons';
import { Header } from '../../components/Header/Header';
import { Sidebar } from '../../components/Sidebar/SideBar';
import { StatCard } from '../../components/StatCard/StatCard';
import { OrderStatusCard } from '../../components/OrderStatusCard/OrderStatusCard';
import { SalesRegionCard } from '../../components/SalesRegionCard/SalesRegionCard';
import { Outlet } from 'react-router-dom';
export const DesktopDashboard = () => {
  const statsData = [
    { label: 'Account Balance', value: 'N45,500.89', change: '+20% Last 30days' },
    { label: 'Total Sales', value: '5,000', change: '+20% Last 30days' },
    { label: 'Active Orders', value: '500.89', change: '+20% Last 30days' },
    { label: 'Total Users', value: '500.89', change: '+20% Last 30days' },
    { label: 'Total Vendors', value: '500.89', change: '+20% Last 30days' },
    { label: 'Total Riders', value: '500.89', change: '+20% Last 30days' }
  ];

  const bestProducts = ['Sports shoes', 'Sports shoes', 'Sports shoes', 'Sports shoes', 'Sports shoes', 'Sports shoes', 'Sports shoes'];
  const topServices = ['Catering', 'Catering', 'Catering', 'Catering', 'Catering'];
  const topVendors = ['Chicken republic', 'Chicken republic', 'Chicken republic', 'Chicken republic', 'Chicken republic'];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 p-8">
          {/* <h1 className="text-2xl font-bold mb-6">Overview</h1>

     
          <div className="grid grid-cols-3 gap-6 mb-8">
            {statsData.map((stat, idx) => (
              <StatCard key={idx} {...stat} />
            ))}
          </div>

     
          <div className="flex gap-4 mb-8">
            <Badge count={20}>
              <Button size="large" type="primary" className="bg-black hover:bg-gray-800">
                Manage Users
              </Button>
            </Badge>
            <Button size="large" type="primary" className="bg-black hover:bg-gray-800">
              Manage Vendors
            </Button>
            <Button size="large" type="primary" className="bg-black hover:bg-gray-800">
              Manage Riders
            </Button>
          </div>

        
          <div className="grid grid-cols-2 gap-6 mb-8">
            <OrderStatusCard />
            <SalesRegionCard />
          </div>

        
          <div className="grid grid-cols-3 gap-6">
            <Card title="Best Selling Products" extra={<span className="text-xs text-gray-500">Last 30days</span>}>
              <div className="space-y-2">
                {bestProducts.map((product, idx) => (
                  <div key={idx} className="flex justify-between py-2 border-b text-sm">
                    <span>{product}</span>
                    <span className="text-green-600">2110 items sold</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card title="Top Services" extra={<span className="text-xs text-gray-500">Last 30days</span>}>
              <div className="space-y-2">
                {topServices.map((service, idx) => (
                  <div key={idx} className="flex justify-between py-2 text-sm">
                    <span>{service}</span>
                    <span className="text-green-600">2110 items sold</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card title="Top Vendors" extra={<span className="text-xs text-gray-500">Last 30days</span>}>
              <div className="space-y-2">
                {topVendors.map((vendor, idx) => (
                  <div key={idx} className="flex justify-between py-2 text-sm">
                    <span>{vendor}</span>
                    <span className="text-gray-500">2110 completed</span>
                  </div>
                ))}
              </div>
            </Card>
          </div> */}
          <Outlet/>
        </main>
      </div>
    </div>
  );
};