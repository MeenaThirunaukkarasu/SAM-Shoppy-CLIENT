import React from 'react';
import { Form, Input, Checkbox, Button, message } from 'antd';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:5005';

const SignUpPage = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const response = await axios.post(`${API_URL}/auth/signup`, {
        name: values.userName,
        email: values.email,
        password: values.password,
      });

      console.log('Signup done successfully', response.data);
      message.success('Signup successful! Please proceed to login.');
      navigate('/login');
    } catch (error) {
      const errorDescription = error.response?.data?.message || 'An unexpected error occurred.';
      message.error(errorDescription);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="container mw-100 d-flex justify-content-xxl-center align-items-center w-100 vh-100">
      <Form
        name="signup"
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 1800 }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Email address"
          name="email"
          rules={[
            {
              required: true,
              type: 'email',
              message: 'Please input your email address!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="User Name"
          name="userName"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignUpPage;
