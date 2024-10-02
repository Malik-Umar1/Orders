import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import AllOrders from "./components/AllOrders";
import { Layout } from "antd";

const { Header, Content } = Layout;


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin =() =>{
    setIsAuthenticated(true)
  };

  const handleLogout =() =>{
    setIsAuthenticated(false)
  }
  return (
    <Router>
  <Layout >
      <Header className="flex items-center justify-center" style={{ color: "white" }}><h1 className="text-2xl font-semibold mb-0">Orders App</h1></Header>
      <Content style={{ padding: "20px" }}>
        <Routes>
          <Route
          path="/signup"
          element={isAuthenticated? <Navigate to="/orders"/> : <Signup onSignup={handleLogin}/>}
          />
             <Route
          path="/signin"
          element={isAuthenticated? <Navigate to="/orders"/> : <Signin onLogin={handleLogin}/>}
          />
             <Route
          path="/orders"
          element={isAuthenticated? <AllOrders onLogout={handleLogout}/> : <Navigate to="/signin" />}
          />
          <Route path="/" element={<Navigate to="/signup" />} />
        </Routes>
        {/* <Signup />
        <Signin />
        <AllOrders /> */}
      </Content>
    </Layout>
    </Router>
  

  );
}

export default App;


