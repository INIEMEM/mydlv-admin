import React, { useState, createContext, useContext } from 'react';
import { Card, Button, Avatar, Badge, DatePicker, Input, Form, Progress, Dropdown, Menu } from 'antd';
import { BellOutlined, EyeOutlined, EyeInvisibleOutlined, CalendarOutlined, DownloadOutlined, HomeOutlined, ShoppingOutlined, UserOutlined, EnvironmentOutlined, CustomerServiceOutlined, LogoutOutlined, MenuOutlined } from '@ant-design/icons';
// import { useAuth } from '../../context/AuthContext';
import { MainContext } from '../../context/AuthContext';
import Logos from '../../assets/logo.png';
export const Header = () => {
  const { user, logout } = useContext(MainContext);

  const userMenu = (
    <Menu>
      <Menu.Item key="profile" icon={<UserOutlined />}>Profile</Menu.Item>
      <Menu.Item key="settings" icon={<UserOutlined />}>Settings</Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={logout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <header className="bg-white border-b px-8 py-4 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-3">
        {/* <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-sm">🌿</span>
        </div>
        <span className="text-2xl font-bold">mydlv</span> */}
        <img src={Logos} alt="Logo" className="w-28" />
      </div>
      <div className="flex items-center gap-4">
        
        <Dropdown overlay={userMenu} trigger={['click']}>
          <Badge count={20} offset={[-5, 5]}>
            <Avatar style={{ backgroundColor: '#1890ff', cursor: 'pointer' }}>
              {user?.name?.substring(0, 2).toUpperCase()}
            </Avatar>
          </Badge>
        </Dropdown>
      </div>
    </header>
  );
};