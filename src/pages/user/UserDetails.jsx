import React, { useState, useEffect } from 'react';
import { Card, Avatar, Table, Button, Spin, message, Badge } from 'antd';
import { ArrowLeftOutlined, UserOutlined, CheckOutlined, CloseOutlined, StopOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';

const UserDetailsPage = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [orderHistory, setOrderHistory] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [actionLoading, setActionLoading] = useState(false);
  
  const { userId } = useParams();
  const baseUrl = 'https://mydlv.onrender.com/api/v1/';

  useEffect(() => {
    fetchUserDetails();
    generateMockOrderHistory();
    generateMockTransactions();
  }, []);

  const fetchUserDetails = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${baseUrl}auth/user/${userId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      
      if (data.success && data.data) {
        setUser(data.data.user);
        console.log(user)
      } else {
        message.error('Failed to fetch user details');
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
      message.error('Failed to fetch user details');
    } finally {
      setLoading(false);
    }
  };

  const generateMockOrderHistory = () => {
    const orders = [
      { key: 1, orderId: 1063, vendorName: 'Joe B', riderId: 54622, time: '16:00pm', date: '1-2-2025', itemQty: '2 Items', amount: 'N6522.54', paymentMethod: 'Wallet', status: 'Completed' },
      { key: 2, orderId: 2036, vendorName: 'Lisa', riderId: 54665, time: '16:00pm', date: '1-2-2025', itemQty: '23 Items', amount: 'N3000.54', paymentMethod: 'Debit Card', status: 'New Order' },
      { key: 3, orderId: 416, vendorName: 'Lawrence', riderId: 5422, time: '16:00pm', date: '1-2-2025', itemQty: '12 Items', amount: 'N84.54', paymentMethod: 'Bank Transfer', status: 'Dispute' },
      { key: 4, orderId: 7845, vendorName: 'Micheal', riderId: 4633, time: '16:00pm', date: '1-2-2025', itemQty: '12 Items', amount: 'N84.54', paymentMethod: 'Wallet', status: 'Rejected' },
      { key: 5, orderId: 6332, vendorName: 'Maria', riderId: 5888, time: '16:00pm', date: '1-2-2025', itemQty: '53 Items', amount: 'N84.54', paymentMethod: 'Wallet', status: 'Dispute' },
    ];
    setOrderHistory(orders);
  };

  const generateMockTransactions = () => {
    const txns = [
      { key: 1, type: 'Withdrawal', date: '2025-07-05', time: '10:20pm', amount: -50000 },
      { key: 2, type: 'Withdrawal', date: '2025-07-05', time: '10:20pm', amount: -50000 },
      { key: 3, type: 'Withdrawal', date: '2025-07-05', time: '10:20pm', amount: -50000 },
      { key: 4, type: 'Order Payment', date: '2025-07-05', time: '10:20pm', amount: 50000 },
    ];
    setTransactions(txns);
  };

  const handleUserAction = async (action, customMessage = '') => {
    setActionLoading(true);
    try {
      const token = localStorage.getItem('token') || 'demo-token';
      const endpoint = `${baseUrl}auth/user/${action}/${user._id}`;
      
      const response = await fetch(endpoint, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: customMessage || `User ${action}d successfully` })
      });

      const data = await response.json();
      
      if (data.success) {
        message.success(`User ${action}d successfully`);
        fetchUserDetails();
      } else {
        message.error(data.message || `Failed to ${action} user`);
      }
    } catch (error) {
      console.error(`Error ${action}ing user:`, error);
      message.success(`Demo: User ${action}d successfully`);
    } finally {
      setActionLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'Completed': 'success',
      'New Order': 'processing',
      'Dispute': 'warning',
      'Rejected': 'error',
    };
    return colors[status] || 'default';
  };

  const orderColumns = [
    {
      title: 'Order ID',
      dataIndex: 'orderId',
      key: 'orderId',
      width: 100,
    },
    {
      title: 'Vendor Name',
      dataIndex: 'vendorName',
      key: 'vendorName',
      width: 140,
    },
    {
      title: 'Rider ID',
      dataIndex: 'riderId',
      key: 'riderId',
      width: 100,
    },
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
      width: 100,
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      width: 110,
    },
    {
      title: 'Item Qty',
      dataIndex: 'itemQty',
      key: 'itemQty',
      width: 100,
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      width: 110,
    },
    {
      title: 'Payment Method',
      dataIndex: 'paymentMethod',
      key: 'paymentMethod',
      width: 140,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (status) => (
        <Badge status={getStatusColor(status)} text={status} />
      ),
    },
  ];

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen lg:ml-64">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="md:p-6 bg-gray-50 min-h-screen lg:ml-64">
      <div className="w-full">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button 
            onClick={() => window.history.back()}
            className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition-colors"
          >
            <ArrowLeftOutlined className="text-lg" />
          </button>
          <h1 className="text-3xl font-bold">User details</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - User Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* User Profile Card */}
            <Card className="bg-[#e8e8e8]">
              <div className="flex flex-col md:flex-row items-center text-center">
                <div>
                  <Avatar size={80} icon={<UserOutlined />} className="mb-4 bg-gray-300" />
                  <h2 className="text-xl font-bold mb-1">{user.firstname || 'N/A'} {user.lastname || ''}</h2>
                  <p className="text-sm text-gray-500 mb-1">ID {user?._id?.slice(-4)?.toUpperCase()}</p>
                </div>
               
                <div className="w-full mt-4 space-y-2 text-left">
                  <div className="flex items-start gap-2 text-sm">
                    <span className="text-gray-400">👤</span>
                    <span className="text-gray-600">{user.firstname} {user.lastname}</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <span className="text-gray-400">✉️</span>
                    <span className="text-gray-600">{user.email}</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <span className="text-gray-400">📞</span>
                    <span className="text-gray-600">{user.phone}</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <span className="text-gray-400">📍</span>
                    <span className="text-gray-600">{user.address?.addressText || `${user.address?.city || ''}, ${user.address?.state || ''}`.trim() || 'N/A'}</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Account Balance Card */}
            <Card className="bg-[#e8e8e8]">
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-2">Wallet Balance</p>
                <h2 className="text-3xl font-bold">N{user?.wallet?.NGN?.toLocaleString() || 0}</h2>
              </div>
            </Card>

            {/* Action Buttons */}
            <Card className="bg-[#e8e8e8]">
              <div className="grid grid-cols-3 gap-3">
                <Button 
                  type="primary"
                  icon={<CheckOutlined />}
                  className="bg-green-600 hover:bg-green-700 border-none h-10"
                  onClick={() => handleUserAction('approve', 'Welcome on board')}
                  loading={actionLoading}
                >
                  Approve
                </Button>
                <Button 
                  danger
                  icon={<CloseOutlined />}
                  className="h-10"
                  onClick={() => handleUserAction('decline')}
                  loading={actionLoading}
                >
                  Decline
                </Button>
                <Button 
                  icon={<StopOutlined />}
                  className="bg-[#333] hover:bg-[#444] text-white border-none h-10"
                  onClick={() => handleUserAction('suspend')}
                  loading={actionLoading}
                >
                  Suspend
                </Button>
              </div>
            </Card>
          </div>

          {/* Right Column - Transactions */}
          <div className="lg:col-span-1">
            <Card className="bg-[#e8e8e8]" title="Transactions">
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {transactions.map((txn) => (
                  <div key={txn.key} className="flex justify-between items-start pb-3 border-b border-gray-100 last:border-b-0">
                    <div>
                      <p className="font-medium text-sm">{txn.type}</p>
                      <p className="text-xs text-gray-500">{txn.date} {txn.time}</p>
                    </div>
                    <p className={`font-bold text-sm ${txn.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {txn.amount > 0 ? '+' : '-'} N{Math.abs(txn.amount).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
              <Button 
                type="default" 
                className="w-full mt-4 rounded-full bg-black text-white hover:bg-gray-800"
                size="large"
              >
                View More
              </Button>
            </Card>
          </div>
        </div>

        {/* Order History Table */}
        <Card className="mt-4 bg-transparent border-none" title={<h2 className="text-xl font-bold">Order History</h2>}>
          <div className="overflow-x-auto">
            <Table
              columns={orderColumns}
              dataSource={orderHistory}
              pagination={{
                pageSize: 10,
                showSizeChanger: false,
                showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
              }}
              scroll={{ x: 800 }}
              className="order-history-table bg-[#e8e8e8] rounded-xl"
            />
          </div>
        </Card>
      </div>

      <style>{`
        .order-history-table .ant-table-thead > tr > th {
          background-color: #e8e8e8;
          font-weight: 600;
          color: #374151;
          border-bottom: 2px solid #e5e7eb;
          font-size: 12px;
        }
        
        .order-history-table .ant-table-tbody > tr > td {
          border-bottom: 1px solid #f3f4f6;
          font-size: 13px;
        }
        
        .order-history-table .ant-table-tbody > tr:hover > td {
          background-color: #e8e8e8;
        }

        .ant-card-head-title {
          font-weight: 600;
        }
        
        .order-history-table .ant-table-tbody {
          background-color: #e8e8e8;
        }
      `}</style>
    </div>
  );
};

export default UserDetailsPage;