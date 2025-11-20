import React, { useState, useEffect } from 'react';
import { Card, Button, Badge, Modal, Input, Upload, message, Spin, Popconfirm } from 'antd';
import { CalendarOutlined, DownloadOutlined, ArrowDownOutlined, PlusOutlined, EditOutlined, DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
const Home = () => {
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [categoryForm, setCategoryForm] = useState({ name: '', image: '' });
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  const baseUrl = 'https://mydlv.onrender.com/api/v1/';

  const statsData = [
    { label: 'Account Balance', value: 'N45,500.89', change: '+20% Last 30days' },
    { label: 'Total Sales', value: '5,000', change: '+20% Last 30days' },
    { label: 'Active Orders', value: '500.89', change: '+20% Last 30days' },
    { label: 'Total Users', value: '500.89', change: '+20% Last 30days' },
    { label: 'Total Vendors', value: '500.89', change: '+20% Last 30days' },
    { label: 'Total Riders', value: '500.89', change: '+20% Last 30days' },
  ];

  const bestProducts = ['Sports shoes', 'Sports shoes', 'Sports shoes', 'Sports shoes', 'Sports shoes', 'Sports shoes', 'Sports shoes'];
  const topServices = ['Catering', 'Catering', 'Catering', 'Catering', 'Catering'];
  const topVendors = ['Chicken republic', 'Chicken republic', 'Chicken republic', 'Chicken republic', 'Chicken republic'];

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoadingCategories(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${baseUrl}category`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      
      if (data.success) {
        setCategories(data.data);
      } else {
        message.error('Failed to fetch categories');
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      message.error('Failed to fetch categories');
    } finally {
      setLoadingCategories(false);
    }
  };

  const handleImageUpload = async (file) => {
    setUploading(true);
    try {
      const token = localStorage.getItem('token');
      
      // Step 1: Get signed URL
      const signResponse = await fetch(`${baseUrl}auth/sign-s3`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fileName: file.name,
          fileType: file.type
        })
      });

      const signData = await signResponse.json();
    
      if (!signData) {
        throw new Error('Failed to get upload URL');
      }

      // Step 2: Upload to S3
      const uploadResponse = await fetch(signData, {
        method: 'PUT',
        headers: {
          'Content-Type': file.type
        },
        body: file
      });
      console.log('signData', uploadResponse);
      if (uploadResponse) {
        setCategoryForm(prev => ({ ...prev, image: uploadResponse.url?.split('?')[0]  }));
        message.success('Image uploaded successfully');
      } else {
        throw new Error('Failed to upload image');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      message.error('Failed to upload image');
    } finally {
      setUploading(false);
    }
    
    return false; // Prevent default upload behavior
  };

  const handleCreateCategory = async () => {
    if (!categoryForm.name || !categoryForm.image) {
      message.error('Please provide both name and image');
      return;
    }

    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${baseUrl}category`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(categoryForm)
      });

      const data = await response.json();
      
      if (data.success) {
        message.success('Category created successfully');
        fetchCategories();
        handleCloseModal();
      } else {
        message.error(data.message || 'Failed to create category');
      }
    } catch (error) {
      console.error('Error creating category:', error);
      message.error('Failed to create category');
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateCategory = async () => {
    if (!categoryForm.name || !categoryForm.image) {
      message.error('Please provide both name and image');
      return;
    }

    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      const updatedData = {
        name: categoryForm.name,
        image: categoryForm.image,
        id: editingCategory._id
      }
      const response = await fetch(`${baseUrl}category`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedData)
      });


      const data = await response.json();
      
      if (data.success) {
        message.success('Category updated successfully');
        fetchCategories();
        handleCloseModal();
      } else {
        message.error(data.message || 'Failed to update category');
      }
    } catch (error) {
      console.error('Error updating category:', error);
      message.error('Failed to update category');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${baseUrl}category/${categoryId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      
      if (data.success) {
        message.success('Category deleted successfully');
        fetchCategories();
      } else {
        message.error(data.message || 'Failed to delete category');
      }
    } catch (error) {
      console.error('Error deleting category:', error);
      message.error('Failed to delete category');
    }
  };

  const handleOpenModal = (category = null) => {
    if (category) {
      setEditingCategory(category);
      setCategoryForm({ name: category.name, image: category.image });
    } else {
      setEditingCategory(null);
      setCategoryForm({ name: '', image: '' });
    }
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setEditingCategory(null);
    setCategoryForm({ name: '', image: '' });
  };

  const StatCard = ({ label, value, change }) => (
    <Card className="bg-[#e5e5e5]">
      <div className="text-sm text-gray-600 mb-1">{label}</div>
      <div className="text-2xl font-bold mb-1">{value}</div>
      <div className="text-xs text-green-600">{change}</div>
    </Card>
  );

  return (
    <div className='lg:ml-64  md:p-6'>
      <div className="flex items-center justify-between mb-8 md:flex-row flex-col gap-4">
        <h1 className="text-2xl font-bold">Overview</h1>
        <div className='flex md:flex-row flex-col gap-2'>
          <Button type="text" className='bg-[#222] text-gray-100 px-8 py-4 rounded-2xl'>Last 30 days <ArrowDownOutlined/></Button>
          <Button type="text" icon={<CalendarOutlined />} className='bg-[#e5e5e5]'>1 Jun 2025 - 20 Jun 2025</Button>
          <Button type="text" icon={<DownloadOutlined />} className='bg-[#e5e5e5]'>Export</Button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid md:grid-cols-3 2xl:grid-cols-4 gap-6 mb-8">
        {statsData.map((stat, idx) => (
          <StatCard key={idx} {...stat} />
        ))}
      </div>

      {/* Management Buttons */}
      <div className="flex md:flex-row flex-col gap-4 mb-8">
        <Badge count={20}>
          <Button onClick={()=> { navigate('./users')}} size="large" type="primary" className="bg-black hover:bg-gray-800">
            Manage Users
          </Button>
        </Badge>
        <Button onClick={()=> { navigate('./vendors')}} size="large" type="primary" className="bg-black hover:bg-gray-800">
          Manage Vendors
        </Button>
        <Button onClick={()=> { navigate('./riders')}} size="large" type="primary" className="bg-black hover:bg-gray-800">
          Manage Riders
        </Button>
      </div>

      {/* Categories Section */}
      <Card 
        title={<h2 className="text-xl font-bold">Categories</h2>} 
        className='bg-[#e5e5e5] mb-8'
        extra={
          <Button 
            type="primary" 
            icon={<PlusOutlined />}
            onClick={() => handleOpenModal()}
            className="bg-black hover:bg-gray-800"
          >
            Add Category
          </Button>
        }
      >
        {loadingCategories ? (
          <div className="flex justify-center py-12">
            <Spin size="large" />
          </div>
        ) : categories.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            No categories found. Create one to get started!
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {categories.map((category) => (
              <Card 
                key={category._id}
                className="bg-white"
                cover={
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="h-40 object-cover"
                  />
                }
              >
                <div className="space-y-2">
                  <h3 className="text-lg font-bold">{category.name}</h3>
                  <p className="text-sm text-gray-500">{category.totalVendors} vendors</p>
                  <div className="flex gap-2 mt-3">
                    <Button 
                      type="default" 
                      icon={<EditOutlined />}
                      onClick={() => handleOpenModal(category)}
                      className="flex-1"
                    >
                      Edit
                    </Button>
                    <Popconfirm
                      title="Delete category"
                      description="Are you sure you want to delete this category?"
                      onConfirm={() => handleDeleteCategory(category._id)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button 
                        danger 
                        icon={<DeleteOutlined />}
                        className="flex-1"
                      >
                        Delete
                      </Button>
                    </Popconfirm>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </Card>

      {/* Data Lists */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card title="Best Selling Products" className='bg-[#e5e5e5]' extra={<span className="text-xs text-gray-500">Last 30days</span>}>
          <div className="space-y-2">
            {bestProducts.map((product, idx) => (
              <div key={idx} className="flex justify-between py-2 border-b text-sm">
                <span>{product}</span>
                <span className="text-green-600">2110 items sold</span>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Top Services" className='bg-[#e5e5e5]' extra={<span className="text-xs text-gray-500">Last 30days</span>}>
          <div className="space-y-2">
            {topServices.map((service, idx) => (
              <div key={idx} className="flex justify-between py-2 text-sm">
                <span>{service}</span>
                <span className="text-green-600">2110 items sold</span>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Top Vendors" className='bg-[#e5e5e5]' extra={<span className="text-xs text-gray-500">Last 30days</span>}>
          <div className="space-y-2">
            {topVendors.map((vendor, idx) => (
              <div key={idx} className="flex justify-between py-2 text-sm">
                <span>{vendor}</span>
                <span className="text-gray-500">2110 completed</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Category Modal */}
      <Modal
        title={<h2 className="text-xl font-bold">{editingCategory ? 'Edit Category' : 'Create Category'}</h2>}
        open={modalVisible}
        onCancel={handleCloseModal}
        footer={[
          <Button key="cancel" onClick={handleCloseModal}>
            Cancel
          </Button>,
          <Button 
            key="submit" 
            type="primary" 
            loading={saving}
            onClick={editingCategory ? handleUpdateCategory : handleCreateCategory}
            className="bg-black hover:bg-gray-800"
          >
            {editingCategory ? 'Update' : 'Create'}
          </Button>
        ]}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Category Name</label>
            <Input
              placeholder="Enter category name"
              value={categoryForm.name}
              onChange={(e) => setCategoryForm(prev => ({ ...prev, name: e.target.value }))}
              size="large"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Category Image</label>
            <Upload
              listType="picture-card"
              maxCount={1}
              beforeUpload={handleImageUpload}
              showUploadList={false}
              accept="image/*"
            >
              {categoryForm.image ? (
                <img src={categoryForm.image} alt="category" className="w-full h-full object-cover" />
              ) : (
                <div>
                  {uploading ? <Spin /> : <UploadOutlined />}
                  <div className="mt-2">Upload</div>
                </div>
              )}
            </Upload>
            {uploading && <p className="text-sm text-gray-500 mt-2">Uploading image...</p>}
          </div>

          {categoryForm.image && (
            <div>
              <label className="block text-sm font-medium mb-2">Image URL</label>
              <Input
                value={categoryForm.image}
                onChange={(e) => setCategoryForm(prev => ({ ...prev, image: e.target.value }))}
                placeholder="Or paste image URL"
                size="large"
              />
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default Home;