import React, { useState } from "react";
import { Form, Input, Button,Typography, Flex, message } from "antd";
import axios from "axios";


const {Title , Paragraph} = Typography
const Signin = ({onLogin}) => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://test-api.achilyon.in/v1/rest-auth/login",
        values
      );
      message.success("Signin Successful!");
      localStorage.setItem("token", response.data.token);
      setLoading(false);
      onLogin();
    } catch (error) {
      console.error("Signin Error: ", error);
      setLoading(false);
    }
   
  };

  return (
    <div className=" h-[80vh] flex items-center justify-center">
        <Flex vertical  className="max-w-[450px] ml-2">
            <Title>Welcome Back!</Title>
            <Paragraph>
            Sign in to your account and pick up right where you left off. Manage your orders, track your progress, and enjoy seamless access to all our services.
            </Paragraph>
        </Flex>
    <div className="border-2 rounded-xl p-5 w-1/2 " style={{ maxWidth: 400, margin: "0 auto", paddingTop: "20px" }}>
       <Title level={2} className="font-semibold text-white">Sign-In</Title>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item name="username" label={<span className="font-semibold ">Username</span>} rules={[{ required: true }]}>
          <Input placeholder="Enter your username" />
        </Form.Item>
        <Form.Item name="password" label={<span className="font-semibold ">Password</span>}  rules={[{ required: true }]}>
          <Input.Password placeholder="Enter your password" />
        </Form.Item>
        <Form.Item>
          <Button className="w-full font-semibold" type="primary" htmlType="submit" loading={loading} onClick={onFinish}>
            Sign-in
          </Button>
        </Form.Item>
        <p >Don't have an account? <a href="/signup" className="font-bold">Sign up</a></p>
      </Form>
    </div>
    </div>

  );
};

export default Signin;
