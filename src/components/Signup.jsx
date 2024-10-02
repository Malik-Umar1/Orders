import React, { useState } from "react";
import { Form, Input, Button, Select, Typography, Flex, message } from "antd";
import axios from "axios";
import { Navigate } from "react-router-dom";

const {Title, Paragraph} = Typography

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [signupSuccess, setSignupSucces] = useState(false)

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://test-api.achilyon.in/v1/rest-auth/register",
        values
      );
      message.success("Signup Successful! Please login.");
      setSignupSucces(true);
      setLoading(false);
    } catch (error) {
      console.error("Signup Error: ", error);
   
      setLoading(false);
    }
   
  };

  if(signupSuccess){
    return <Navigate to="/signin"/>
  }

  return (
    <div className=" h-[80vh] flex items-center justify-center">
        <Flex vertical className="max-w-[450px] ml-2">
        <Title>Join Our Community Today!</Title>
        <Paragraph>
        Sign up now to access exclusive features, manage your orders, and stay updated with the latest offerings. It's quick, easy, and you'll be ready to explore all that we have to offer in just a few clicks!    
        </Paragraph>
        </Flex>
  <div className="border-2 rounded-xl p-5  " style={{ maxWidth: 400, margin: "0 auto", paddingTop: "20px" }}>
      <Title level={3} className="font-semibold">Sign-up</Title>
      <hr className="border"/>
      <Form layout="vertical" size="small"  onFinish={onFinish}>
        <Flex gap={20}>
        <Form.Item className="w-1/2" name="username" label="Username" rules={[{ required: true }]}>
          <Input placeholder="Enter your username" />
        </Form.Item>
        <Form.Item className="w-1/2" name="password" label="Password" rules={[{ required: true }]}>
          <Input.Password placeholder="Enter your password" />
        </Form.Item>
        </Flex>
       <Flex gap={20}>
       <Form.Item className="w-1/2" name="email" label="Email" rules={[{ required: true, type: "email" }]}>
          <Input placeholder="Enter your email" />
        </Form.Item>
        <Form.Item className="w-1/2" name="name" label="Name" rules={[{ required: true }]}>
          <Input placeholder="Enter your name" />
        </Form.Item>
       </Flex>
        
        <Form.Item name="phone_number" label="Phone Number" rules={[{ required: true }]}>
          <Input placeholder="Enter your phone number" />
        </Form.Item>
        <Form.Item name="role" label="Role" rules={[{ required: true }]}>
          <Select>
            <Select.Option value="CUSTOMER">Customer</Select.Option>
            <Select.Option value="RESTAURANT">Restaurant</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full" loading={loading} onClick={onFinish}>
            Signup
          </Button>
        </Form.Item>
        <p>Already have an account? <a href="/signin" className="font-bold">Sign in</a></p>
      </Form>
    </div>
    </div>
  
  );
};

export default Signup;
