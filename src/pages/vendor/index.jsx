import React, { useState, useEffect } from 'react';
import { Input, Table, Card, message, Spin } from 'antd';
import { SearchOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import { useNavigate } from "react-router-dom";

const VendorsPage = () => {
  const [loading, setLoading] = useState(false);
  const [vendors, setVendors] = useState([]);
  const [filteredVendors, setFilteredVendors] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [totalVendors, setTotalVendors] = useState(0);
  const [growthPercentage, setGrowthPercentage] = useState('+20%');
  const navigate = useNavigate();
  // Base URL - replace with your actual baseUrl from context
  const baseUrl = 'https://mydlv.onrender.com/api/v1/';

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${baseUrl}vendor`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      
      if (data.success) {
        const formattedVendors = data.data.map((vendor) => ({
          key: vendor._id,
          vendorId: vendor._id.slice(-4).toUpperCase(),
          fullName: `${vendor.userId?.firstname || ''} ${vendor.userId?.lastname || ''}`.trim() || 'N/A',
          email: vendor.userId?.email || vendor.businessEmail || 'N/A',
          phone: vendor.userId?.phone || vendor.businessPhone || 'N/A',
          location: `${vendor.businessAddress?.city || ''}, ${vendor.businessAddress?.state || ''}`.trim() || 'N/A',
          dateJoined: vendor.createdAt ? new Date(vendor.createdAt).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: '2-digit', 
            day: '2-digit' 
          }).replace(/\//g, '-') : 'N/A',
          orderCount: Math.floor(Math.random() * 1500) + 100
        }));

        setVendors(formattedVendors);
        setFilteredVendors(formattedVendors);
        setTotalVendors(data.metaData?.totalItems || formattedVendors.length);
      } else {
        message.error('Failed to fetch vendors');
      }
    } catch (error) {
      console.error('Error fetching vendors:', error);
      message.error('Failed to fetch vendors');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value) => {
    setSearchText(value);
    const filtered = vendors.filter(vendor => 
      vendor.fullName.toLowerCase().includes(value.toLowerCase()) ||
      vendor.email.toLowerCase().includes(value.toLowerCase()) ||
      vendor.vendorId.toLowerCase().includes(value.toLowerCase()) ||
      vendor.phone.includes(value)
    );
    setFilteredVendors(filtered);
  };

  const columns = [
    {
      title: 'Vendor ID',
      dataIndex: 'vendorId',
      key: 'vendorId',
      width: 120,
    },
    {
      title: 'Full Name',
      dataIndex: 'fullName',
      key: 'fullName',
      width: 150,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: 200,
    },
    {
      title: 'Phone no',
      dataIndex: 'phone',
      key: 'phone',
      width: 160,
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
      width: 180,
    },
    {
      title: 'Date joined',
      dataIndex: 'dateJoined',
      key: 'dateJoined',
      width: 130,
    },
    {
      title: 'Order count',
      dataIndex: 'orderCount',
      key: 'orderCount',
      width: 120,
      align: 'right',
    },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className=" md:p-6 bg-gray-50 min-h-screen lg:ml-64"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button 
            onClick={() => window.history.back()}
            className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition-colors"
          >
            <ArrowLeftOutlined className="text-lg" />
          </button>
          <h1 className="text-3xl font-bold">Vendors</h1>
        </div>

        {/* Stats Card */}
        <div className='flex gap-2 items-center flex-col md:flex-row'>

          <Card className="mb-6 flex-1 bg-[#e8e8e8]">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-sm text-gray-600 mb-1">Total Vendors</div>
                <div className="flex items-baseline gap-2">
                  <span className="text-green-600 text-sm font-medium">{growthPercentage}</span>
                  <span className="text-gray-500 text-sm">Last 30days</span>
                </div>
              </div>
              <div className="text-4xl font-bold">{totalVendors.toFixed(2)}</div>
            </div>
          </Card>

          {/* Search */}
          <div className="mb-6 flex-1 flex">
            <Input
              size="large"
              placeholder="Search vendor"
              // prefix={<SearchOutlined className="text-gray-400" />}
              value={searchText}
              onChange={(e) => handleSearch(e.target.value)}
              className="max-w-md h-[38px] rounded-none rounded-l-xl"
              // style={{}}
            />
            <button className='bg-[#333] h-[38px] px-4 rounded-r-xl'>
              <SearchOutlined className="text-gray-400" />
            </button>
          </div>
        </div>

        {/* Table */}
       
          <Spin spinning={loading}>
            <Table
              columns={columns}
              dataSource={filteredVendors}
              pagination={{
                pageSize: 10,
                showSizeChanger: false,
                showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
              }}
              // scroll={{ x: 'max-content' }}
              scroll={{ x: 800 }} 
              className="vendors-table "
              onRow={(record) => {
                return {
                  onClick: () => navigate(`./${record.key}`)
                };
              }}
            />
          </Spin>
    
      </div>

      <style>{`
        .vendors-table .ant-table-thead > tr > th {
          background-color: #e8e8e8;
          font-weight: 600;
          color: #374151;
          border-bottom: 2px solid #e5e7eb;
        }
        
        .vendors-table .ant-table-tbody > tr > td {
          border-bottom: 1px solid #333;
        }
        
        .vendors-table .ant-table-tbody > tr:hover > td {
          background-color: #e8e8e8;
        }
          .vendors-table .ant-table-tbody{
           background-color: #e8e8e8;
          }
      `}</style>
    </motion.div>
  );
};

export default VendorsPage;