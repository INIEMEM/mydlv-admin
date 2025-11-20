import React, { useState, createContext, useContext } from 'react';
import { Card, Button, Avatar, Badge, DatePicker, Input, Form, Progress, Dropdown, Menu } from 'antd';
export const StatCard = ({ label, value, change }) => {
  return (
    <Card className="hover:shadow-sm border border-[#cccccc] transition-shadow bg-[#E5E5E5] ">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-gray-500">{label}</div>
          <div className="text-xs text-green-600 mb-2">{change}</div>
        </div>
        <div className="md:text-xl text-xl font-bold">{value}</div>
      </div>
    </Card>
  );
};
