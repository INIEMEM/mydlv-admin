import React, { useState, createContext, useContext } from 'react';
import axios from 'axios';
import { Card, Button, Avatar, Badge, DatePicker, Input, Form, Progress, Dropdown, Menu, message } from 'antd';
import { 
  BellOutlined, EyeOutlined, EyeInvisibleOutlined, CalendarOutlined, 
  DownloadOutlined, HomeOutlined, ShoppingOutlined, UserOutlined, 
  EnvironmentOutlined, CustomerServiceOutlined, LogoutOutlined, 
  MenuOutlined, ArrowLeftOutlined 
} from '@ant-design/icons';
import Logos from "../assets/logo.png";
import { MainContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1); // 1: email, 2: OTP
  const [userToken, setUserToken] = useState('');
  const navigate = useNavigate();
  const { login, baseUrl, setToken } = useContext(MainContext);

  // Step 1: Send email to get OTP
  const handleEmailSubmit = async () => {
    if (!email) {
      message.error('Please enter your email');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${baseUrl}auth/login-attempt`, {
        email
      });

      const data = response.data;

      message.success('OTP sent to your email!');

      // setUserToken(data.token || data.userToken || '');
      setStep(2);
      
    } catch (error) {
      console.error('Login attempt error:', error);
      message.error(error.response?.data?.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP
  const handleOtpSubmit = async () => {
    if (!otp) {
      message.error('Please enter the OTP');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${baseUrl}auth/login`, {
        token: otp,
       
      });

      const data = response.data;

      message.success('Login successful!');

      // Save auth token and user info
      localStorage.setItem("token", data.token);
      // login(data.user || { email });

      message.info('Redirecting to dashboard...');
      navigate("/");
      
    } catch (error) {
      console.error('OTP verification error:', error);
      message.error(error.response?.data?.message || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setStep(1);
    setOtp('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            {/* <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">🌿</span>
            </div>
            <span className="text-3xl font-bold">mydlv</span> */}
            <img src={Logos} alt="Logo" className="w-28" />
          </div>
          <h2 className="text-2xl font-bold mb-2">
            {step === 1 ? 'Admin Login' : 'Verify OTP'}
          </h2>
          <p className="text-gray-500">
            {step === 1 
              ? 'Sign in to access your dashboard' 
              : `Enter the OTP sent to ${email}`}
          </p>
        </div>

        {step === 1 ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <Input 
                size="large" 
                placeholder="admin@mydlv.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onPressEnter={handleEmailSubmit}
              />
            </div>

            <Button
              type="primary"
              size="large"
              loading={loading}
              onClick={handleEmailSubmit}
              className="w-full bg-black hover:bg-gray-800"
            >
              Continue
            </Button>

            {/* <div className="text-center text-sm text-gray-500 mt-4">
              Don't have an account? <button className="text-blue-600 hover:underline">Contact support</button>
            </div> */}
          </div>
        ) : (
          <div className="space-y-4">
            <Button
              type="text"
              icon={<ArrowLeftOutlined />}
              onClick={handleBack}
              className="mb-2"
            >
              Back
            </Button>

            <div>
              <label className="block text-sm font-medium mb-2">One-Time Password</label>
              <Input 
                size="large" 
                placeholder="Enter 6-digit OTP"
                value={otp}
                maxLength={6}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                onPressEnter={handleOtpSubmit}
              />
            </div>

            <Button
              type="primary"
              size="large"
              loading={loading}
              onClick={handleOtpSubmit}
              className="w-full bg-black hover:bg-gray-800"
            >
              Verify & Sign In
            </Button>

            <div className="text-center text-sm text-gray-500 mt-4">
              Didn't receive the code? 
              <button 
                className="text-blue-600 hover:underline ml-1"
                onClick={handleEmailSubmit}
              >
                Resend OTP
              </button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};
