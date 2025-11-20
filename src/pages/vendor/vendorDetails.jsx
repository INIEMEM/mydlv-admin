import React, { useState, useEffect } from 'react';
import { Card, Avatar, Table, Button, Spin, message, Badge, Modal } from 'antd';
import { ArrowLeftOutlined, UserOutlined, CheckOutlined, CloseOutlined, StopOutlined, ShoppingOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';

const VendorDetailsPage = () => {
  const [loading, setLoading] = useState(false);
  const [vendor, setVendor] = useState(null);
  const [orderHistory, setOrderHistory] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [productsModalVisible, setProductsModalVisible] = useState(false);
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  
  const { vendorId } = useParams();
  // const vendorId = '69198650d323a30d6ebb8c9b';
  const baseUrl = 'https://mydlv.onrender.com/api/v1/';

  useEffect(() => {
    fetchVendorDetails();
    generateMockOrderHistory();
    generateMockTransactions();
  }, []);

  const fetchVendorDetails = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${baseUrl}vendor/${vendorId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      
      if (data.success && data.data.length > 0) {
        setVendor(data.data[0]);
      } else {
        message.error('Failed to fetch vendor details');
      }
    } catch (error) {
      console.error('Error fetching vendor details:', error);
      message.error('Failed to fetch vendor details');
    } finally {
      setLoading(false);
    }
  };

  const generateMockOrderHistory = () => {
    const orders = [
      { key: 1, orderId: 1063, customerName: 'Joe B', riderId: 54622, time: '16:00pm', date: '1-2-2025', itemQty: '2 Items', amount: 'N6522.54', paymentMethod: 'Wallet', status: 'Completed' },
      { key: 2, orderId: 2036, customerName: 'Lisa', riderId: 54665, time: '16:00pm', date: '1-2-2025', itemQty: '23 Items', amount: 'N3000.54', paymentMethod: 'Debit Card', status: 'New Order' },
      { key: 3, orderId: 416, customerName: 'Lawrence', riderId: 5422, time: '16:00pm', date: '1-2-2025', itemQty: '12 Items', amount: 'N84.54', paymentMethod: 'Bank Transfer', status: 'Dispute' },
      { key: 4, orderId: 7845, customerName: 'Micheal', riderId: 4633, time: '16:00pm', date: '1-2-2025', itemQty: '12 Items', amount: 'N84.54', paymentMethod: 'Wallet', status: 'Rejected' },
      { key: 5, orderId: 6332, customerName: 'Maria', riderId: 5888, time: '16:00pm', date: '1-2-2025', itemQty: '53 Items', amount: 'N84.54', paymentMethod: 'Wallet', status: 'Dispute' },
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

  const handleVendorAction = async (action, customMessage = '') => {
    setActionLoading(true);
    try {
      const token = localStorage.getItem('token') || 'demo-token';
      const endpoint = `${baseUrl}vendor/${action}/${vendor._id}`;
      
      const response = await fetch(endpoint, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: customMessage || `Vendor ${action}d successfully` })
      });

      const data = await response.json();
      
      if (data.success) {
        message.success(`Vendor ${action}d successfully`);
        fetchVendorDetails();
      } else {
        message.error(data.message || `Failed to ${action} vendor`);
      }
    } catch (error) {
      console.error(`Error ${action}ing vendor:`, error);
      message.success(`Demo: Vendor ${action}d successfully`);
    } finally {
      setActionLoading(false);
    }
  };

  const fetchVendorProducts = async () => {
    setLoadingProducts(true);
    setProductsModalVisible(true);
    try {
      const token = localStorage.getItem('token') || 'demo-token';
      const response = await fetch(`${baseUrl}product/vendor/${vendor.userId?._id || vendor.userId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      
      if (data.success && data.data) {
        setProducts(data.data.data || data.data || []);
      } else {
        // Use mock products for demo
       
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      // Use mock products for demo
      // setProducts([
      //   {
      //     _id: '6919a56b3389260397b7ca41',
      //     title: 'Red Oil Fresh',
      //     description: 'This is a very fresh Red Oil from palm fruit',
      //     images: ['https://media.gettyimages.com/id/1403973419/photo/table-top-of-food-spread-on-table.jpg?s=612x612&w=0&k=20&c=2cROUMurZUtuvqF-bp8lViZ0wDXBNkZBcIjQj2QQlec='],
      //     price: '4500',
      //     unit: 100,
      //     guage: 'pieces',
      //     weight: '2kg',
      //     size: '2cm by 15cm',
      //     category: { name: 'Side Meals' },
      //     status: true,
      //     vendorType: 'restaurant'
      //   },
      //   {
      //     _id: '69184873b0022f626c7b1548',
      //     title: 'Egg Shawarma',
      //     description: 'This is a very tasty proten rolls made with floor sugar milk and eggs',
      //     images: ['https://media.gettyimages.com/id/1403973419/photo/table-top-of-food-spread-on-table.jpg?s=612x612&w=0&k=20&c=2cROUMurZUtuvqF-bp8lViZ0wDXBNkZBcIjQj2QQlec='],
      //     price: '4500',
      //     unit: 100,
      //     guage: 'pieces',
      //     weight: '2kg',
      //     size: '2cm by 15cm',
      //     category: { name: 'Side Meals' },
      //     status: true,
      //     vendorType: 'restaurant'
      //   }
      // ]);
    } finally {
      setLoadingProducts(false);
    }
  };

  const handleProductAction = async (action, productId, vendorType) => {
    try {
      const token = localStorage.getItem('token') || 'demo-token';
      const endpoint = `${baseUrl}product/${action}/${productId}`;
      
      const response = await fetch(endpoint, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ vendorType })
      });

      const data = await response.json();
      
      if (data.success) {
        message.success(`Product ${action}d successfully`);
        fetchVendorProducts();
      } else {
        message.error(data.message || `Failed to ${action} product`);
      }
    } catch (error) {
      console.error(`Error ${action}ing product:`, error);
      message.success(`Demo: Product ${action}d successfully`);
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
      title: 'Customer Name',
      dataIndex: 'customerName',
      key: 'customerName',
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

  if (loading || !vendor) {
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
          <h1 className="text-3xl font-bold">Vendor details</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Vendor Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Vendor Profile Card */}
            <Card className="bg-[#e8e8e8]">
              <div className="flex flex-col md:flex-row items-center text-center">
                <div>
                  <Avatar size={80} icon={<UserOutlined />} className="mb-4 bg-gray-300" />
                  <h2 className="text-xl font-bold mb-1">{vendor.businessName}</h2>
                  <p className="text-sm text-gray-500 mb-1">ID {vendor._id.slice(-4).toUpperCase()}</p>
                </div>
               
                <div className="w-full mt-4 space-y-2 text-left">
                  <div className="flex items-start gap-2 text-sm">
                    <span className="text-gray-400">👤</span>
                    <span className="text-gray-600">{vendor.userId?.firstname} {vendor.userId?.lastname}</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <span className="text-gray-400">✉️</span>
                    <span className="text-gray-600">{vendor.userId?.email || vendor.businessEmail}</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <span className="text-gray-400">📞</span>
                    <span className="text-gray-600">{vendor.userId?.phone || vendor.businessPhone}</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <span className="text-gray-400">📍</span>
                    <span className="text-gray-600">{vendor.businessAddress?.addressText}</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Account Balance Card */}
            <Card className="bg-[#e8e8e8]">
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-2">Account Balance</p>
                <h2 className="text-3xl font-bold">N{vendor?.userId?.wallet?.NGN.toLocaleString()}</h2>
              </div>
            </Card>

            {/* Action Buttons */}
            <Card className="bg-[#e8e8e8]">
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  type="primary"
                  icon={<CheckOutlined />}
                  className="bg-green-600 hover:bg-green-700 border-none h-10"
                  onClick={() => handleVendorAction('approve', 'Welcome on board')}
                  loading={actionLoading}
                >
                  Approve
                </Button>
                <Button 
                  danger
                  icon={<CloseOutlined />}
                  className="h-10"
                  onClick={() => handleVendorAction('decline')}
                  loading={actionLoading}
                >
                  Decline
                </Button>
                <Button 
                  icon={<StopOutlined />}
                  className="bg-[#333] hover:bg-[#444] text-white border-none h-10"
                  onClick={() => handleVendorAction('suspend')}
                  loading={actionLoading}
                >
                  Suspend
                </Button>
                <Button 
                  type="default"
                  icon={<ShoppingOutlined />}
                  className="h-10"
                  onClick={fetchVendorProducts}
                >
                  View Products
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

      {/* Products Modal */}
      <Modal
        title={<h2 className="text-xl font-bold">Vendor Products</h2>}
        open={productsModalVisible}
        onCancel={() => setProductsModalVisible(false)}
        footer={null}
        width={900}
        bodyStyle={{ maxHeight: '70vh', overflowY: 'auto' }}
      >
        {loadingProducts ? (
          <div className="flex justify-center py-12">
            <Spin size="large" />
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            No products found for this vendor
          </div>
        ) : (
          <div className="space-y-4">
            {products.map((product) => (
              <Card key={product._id} className="bg-[#e8e8e8]">
                <div className="flex flex-col md:flex-row gap-4">
                  <img 
                    src={product.images[0]} 
                    alt={product.title}
                    className="w-full md:w-32 h-32 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-bold mb-2">{product.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                    <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                      <div><span className="font-semibold">Price:</span> N{product.price}</div>
                      <div><span className="font-semibold">Unit:</span> {product.unit} {product.guage}</div>
                      {product.weight && <div><span className="font-semibold">Weight:</span> {product.weight}</div>}
                      {product.size && <div><span className="font-semibold">Size:</span> {product.size}</div>}
                      <div><span className="font-semibold">Category:</span> {product.category?.name}</div>
                      <div><span className="font-semibold">Status:</span> <Badge status={product.status ? 'success' : 'error'} text={product.status ? 'Active' : 'Inactive'} /></div>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        type="primary"
                        size="small"
                        className="bg-green-600 hover:bg-green-700 border-none"
                        onClick={() => handleProductAction('approve', product._id, product.vendorType)}
                      >
                        Approve
                      </Button>
                      <Button 
                        danger
                        size="small"
                        onClick={() => handleProductAction('decline', product._id, product.vendorType)}
                      >
                        Decline
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </Modal>

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

export default VendorDetailsPage;