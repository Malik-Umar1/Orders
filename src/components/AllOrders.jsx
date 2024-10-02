// import React, { useEffect, useState } from "react";
// import { Table, Select, Checkbox } from "antd";
// import axios from "axios";

// const AllOrders = () => {
//   const [orders, setOrders] = useState([]);
//   const [filters, setFilters] = useState({
//     status: "PENDING", // default filter
//     is_cash: true,
//   });

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const token = localStorage.getItem("token");

//         const pendingOrders = await axios.post(
//           "https://test-api.achilyon.in/v1/orders/all-orders",
//           { status: "PENDING", is_cash: true },
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

      
//         const servedOrders = await axios.post(
//           "https://test-api.achilyon.in/v1/orders/all-orders",
//           { status: "SERVED", is_cash: true },
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         setOrders([...pendingOrders.data.orders, ...servedOrders.data.orders]);
//       } catch (error) {
//         console.error("Error fetching orders: ", error);
//       }
//     };

//     fetchOrders();
//   }, [filters]);

//   const handleStatusChange = (value) => {
//     setFilters({ ...filters, status: value });
//   };

//   const handleCashPaymentChange = (e) => {
//     setFilters({ ...filters, is_cash: e.target.checked });
//   };

//   const columns = [
//     {
//       title: "Order Version",
//       dataIndex: "order_version",
//       key: "order_version",
//     },
//     {
//       title: "Status",
//       dataIndex: "status",
//       key: "status",
//     },
//     {
//       title: "Cash Payment",
//       dataIndex: "is_cash",
//       key: "is_cash",
//       render: (is_cash) => (is_cash ? "Yes" : "No"),
//     },
//   ];

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>All Orders</h2>
//       <div style={{ marginBottom: "20px" }}>
//         <Select
//           defaultValue="PENDING"
//           onChange={handleStatusChange}
//           style={{ width: 200, marginRight: "20px" }}
//         >
//           <Select.Option value="PENDING">Pending</Select.Option>
//           <Select.Option value="SERVED">Served</Select.Option>
//         </Select>
//         <Checkbox checked={filters.is_cash} onChange={handleCashPaymentChange}>
//           Cash Payment
//         </Checkbox>
//       </div>
//       <Table dataSource={orders} columns={columns} rowKey="order_version" />
//     </div>
//   );
// };

// export default AllOrders;

import React, { useEffect, useState } from "react";
import { Table, Select, Checkbox, Flex, Button } from "antd";
import axios from "axios";

const AllOrders = ({onLogout}) => {
  const [orders, setOrders] = useState([]);
  const [filters, setFilters] = useState({
    status: "PENDING", // default filter
    is_cash: true,
  });

  const handleLogoutClick = () => {
    onLogout();
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");

        // Fetch orders based on selected status and cash payment filter
        const response = await axios.post(
          "https://test-api.achilyon.in/v1/orders/all-orders",
          { status: filters.status, is_cash: filters.is_cash },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setOrders(response.data.orders); // Update the orders state
      } catch (error) {
        console.error("Error fetching orders: ", error);
      }
    };

    fetchOrders();
  }, [filters]); // Trigger useEffect whenever filters change

  // Handle status change
  const handleStatusChange = (value) => {
    setFilters({ ...filters, status: value });
  };

  // Handle cash payment filter change
  const handleCashPaymentChange = (e) => {
    setFilters({ ...filters, is_cash: e.target.checked });
  };

  // Table columns
  const columns = [
    {
      title: "Order Version",
      dataIndex: "order_version",
      key: "order_version",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Cash Payment",
      dataIndex: "is_cash",
      key: "is_cash",
      render: (is_cash) => (is_cash ? "Yes" : "No"),
    },
  ];

  return (
    <div className="space-y-1 h-[80vh]" style={{ padding: "20px" }}>
      <h2>All Orders</h2>
      <Flex justify="space-between">
      <div className="border" style={{ marginBottom: "20px" }}>
        <Select
          defaultValue="PENDING"
          onChange={handleStatusChange}
          style={{ width: 200, marginRight: "20px" }}
        >
          <Select.Option value="PENDING">Pending</Select.Option>
          <Select.Option value="SERVED">Served</Select.Option>
        </Select>
        <Checkbox checked={filters.is_cash} onChange={handleCashPaymentChange}>
          Cash Payment
        </Checkbox>
      </div>
      <Button type="primary" onClick={handleLogoutClick} >Logout</Button>
      </Flex>
     
      <Table size="middle" className="border border-gray-300 h-[60vh] rounded-lg" dataSource={orders} columns={columns} rowKey="order_version" />
      <Flex justify="flex-end">
      {/* <button className="border px-2 py-1  bg-[red] text-white font-semibold rounded-md" onClick={handleLogoutClick}>Logout</button> */}
     
      </Flex>
     
    </div>
  );
};

export default AllOrders;
