import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


export default function About() {

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('authToken') === '') {
      navigate("/user/login");
    };
    const authTokenData = {
      token: localStorage.getItem('authToken'),
    }
    axios.post('https://swapsphere-backend.onrender.com/user/checkTokens', authTokenData).then((response) => {
      const tokenstatus = response.data.status;
      console.log(tokenstatus)
      if (tokenstatus != "true") {
        navigate("/user/login");
      }
    }).catch((error) => {
      console.log(error)
    });
  }, []);

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center h-screen">
        <h2 className="text-3xl font-bold mb-4 text-center">
          About Us
        </h2>
        <p className="text-lg text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec
          ipsum vel nisi auctor finibus. Suspendisse potenti. Phasellus sit amet
          lacus ut orci sagittis consequat.
        </p>
      </div>
      <Footer />
    </div>
  );
}
