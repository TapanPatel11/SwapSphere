//author: Raj Patel <rj540530@dal.ca>

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const Admin = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchData();

    if (
      localStorage.getItem("authToken") === "" ||
      localStorage.getItem("role") !== "admin"
    ) {
      navigate("/user/login");
    }
    const authTokenData = {
      token: localStorage.getItem("authToken"),
    };
    axios
      .post("http://localhost:8080/user/checkTokens", authTokenData)
      .then((response) => {
        const tokenstatus = response.data.status;
        console.log(tokenstatus);
        if (tokenstatus != "true") {
          navigate("/user/login");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const fetchData = () => {
    axios
      .get("http://localhost:8080/admin/getAllReportedUsers")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    axios
      .get("http://localhost:8080/admin/getAllReportedProducts")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDeleteProduct = (productId) => {
    axios
      .delete(`http://localhost:8080/admin/deleteProduct/${productId}`)
      .then((response) => {
        fetchData();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDeleteUser = (userId) => {
    axios
      .delete(`http://localhost:8080/admin/deleteUser/${userId}`)
      .then((response) => {
        fetchData();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    const tokenrequest = {
      token: localStorage.getItem("authToken"),
    };
    try {
      const response = await axios.post(
        "http://localhost:8080/user/deleteTokens",
        tokenrequest
      );
      if (response.data.status === "true") {
        localStorage.setItem("authToken", "");
        localStorage.setItem("email", "");
        navigate("/user/login");
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <div
        style={{
          backgroundColor: "#1f2937",
          color: "white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 20px",
        }}
      >
        <h1 style={{ margin: "0 auto" }}>Admin Panel</h1>
        <button
          className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "2%",
        }}
      >
        <div
          className="my-4"
          style={{
            width: "100%",
            boxSizing: "border-box",
            textAlign: "center",
          }}
        >
          <h2 className="text-xl font-semibold mb-4">Reported Users</h2>
          <div style={{ display: "inline-block", border: "1px solid black" }}>
            <table
              className="border-collapse"
              style={{
                borderRadius: "4px",
                overflow: "hidden",
                margin: "0 auto",
                border: "1px solid black",
              }}
            >
              <thead>
                <tr>
                  <th className="p-2">User Name</th>
                  <th className="p-2">User Email</th>
                  <th className="p-2">No of Times User Reported</th>
                  <th className="p-2"></th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-gray-300">
                    <td className="p-2">
                      {user.firstName + " " + user.lastName}
                    </td>
                    <td className="p-2">{user.email}</td>
                    <td className="p-2">{user.noOfTimesUserReported}</td>
                    <td className="p-2">
                      <button
                        className="px-4 py-2 bg-red-500 text-white rounded"
                        onClick={() => handleDeleteUser(user._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div
          className="my-4"
          style={{
            width: "100%",
            boxSizing: "border-box",
            textAlign: "center",
          }}
        >
          <h2 className="text-xl font-semibold mb-4">Reported Products</h2>
          <div style={{ display: "inline-block", border: "1px solid black" }}>
            <table
              className="border-collapse"
              style={{
                borderRadius: "4px",
                overflow: "hidden",
                margin: "0 auto",
                border: "1px solid black",
              }}
            >
              <thead>
                <tr>
                  <th className="p-2">Name</th>
                  <th className="p-2">Description</th>
                  <th className="p-2">No of Times Reported</th>
                  <th className="p-2"></th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b border-gray-300">
                    <td className="p-2">{product.productName}</td>
                    <td className="p-2">{product.description}</td>
                    <td className="p-2">{product.noOfTimesProductReported}</td>
                    <td className="p-2">
                      <button
                        className="px-4 py-2 bg-red-500 text-white rounded"
                        onClick={() => handleDeleteProduct(product._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Admin;
