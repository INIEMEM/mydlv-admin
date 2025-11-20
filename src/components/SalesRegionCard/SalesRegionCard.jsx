import React, { useState, createContext, useContext } from 'react';
import { Card, Button, Avatar, Badge, DatePicker, Input, Form, Progress, Dropdown, Menu } from 'antd';
import { BellOutlined, EyeOutlined, EyeInvisibleOutlined, CalendarOutlined, DownloadOutlined, HomeOutlined, ShoppingOutlined, UserOutlined, EnvironmentOutlined, CustomerServiceOutlined, LogoutOutlined, MenuOutlined } from '@ant-design/icons';
export const SalesRegionCard = () => {
  const salesRegions = [
    { region: 'Bonny', percentage: 85 },
    { region: 'Ikot Ekpene', percentage: 85 },
    { region: 'Itam', percentage: 85 },
    { region: 'Nwaniba', percentage: 85 },
    { region: 'PH', percentage: 85 },
    { region: 'PH', percentage: 85 },
    { region: 'PH', percentage: 85 }
  ];

  return (
    <Card title=""  className='bg-[#e5e5e5]'>
      <div className='mb-2'>
        <h1 className='font-semibold text-lg'>Best Sales Region</h1>
        <span className="text-xs text-gray-500 ">Last 30days</span>
      </div>
      <div className="space-y-3">
        {salesRegions.map((region, idx) => (
          <div key={idx} className="flex items-center gap-3">
            <div className="flex-1">
              <div className="text-sm mb-1">{region.region}</div>
              <Progress percent={region.percentage} showInfo={false} strokeColor="#10b981" />
            </div>
            <span className="text-sm font-medium">{region.percentage}%</span>
          </div>
        ))}
      </div>
    </Card>
  );
};