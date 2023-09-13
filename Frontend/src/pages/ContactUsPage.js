import React from 'react';
import { FiSend, FiFacebook, FiInstagram, FiMail, FiPhone } from 'react-icons/fi';
import { motion } from 'framer-motion';
import '../index.css';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const ContactUsPage = () => {
  const verifyToken = async (e) => {
    const authToken = {
      token: localStorage.getItem('authToken'),
    };
    console.log(authToken)
    const response = await axios.post('https://swapsphere-backend.onrender.com/checkTokens', authToken);
    const tokenstatus = response.data.status;
    console.log(tokenstatus)
    if (tokenstatus == "true") {
      return true;
    }
    else {
      return false;
    }
  }
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem('authToken') === '') {
      navigate("/user/login");
    };
    const authTokenData = {
      token: localStorage.getItem('authToken'),
    }
    axios.post('https://csci5709-grp-15-server.onrender.com/user/checkTokens', authTokenData).then((response) => {
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
      <div className="min-h-screen py-6 flex flex-col justify-center sm:py-12">
        <div className="max-w-md mx-auto px-4">
          <div className="bg-white shadow-xl rounded-xl px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <h2 className="text-2xl font-bold mb-2 text-blue-800">Contact Us</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Your Email"
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
                Message
              </label>
              <textarea
                rows={4}
                id="message"
                name="message"
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Your Message"
              />
            </div>
            <div className="mt-6 flex items-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
                type="button"
              >
                <FiSend className="mr-2" />
                <span>Send Message</span>
              </motion.button>
            </div>
            <div className="mt-8">
              <p className="text-gray-700 text-sm font-bold">Connect with us:</p>
              <div className="flex items-center mt-2">
                <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="mr-4">
                  <motion.span
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.8 }}
                    className="text-blue-600 cursor-pointer"
                  >
                    <FiFacebook size={24} />
                  </motion.span>
                </a>
                <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="mr-4">
                  <motion.span
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.8 }}
                    className="text-purple-600 cursor-pointer"
                  >
                    <FiInstagram size={24} />
                  </motion.span>
                </a>
                <a href="mailto:example@gmail.com" className="mr-4">
                  <motion.span
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.8 }}
                    className="text-red-600 cursor-pointer"
                  >
                    <FiMail size={24} />
                  </motion.span>
                </a>
                <a href="tel:+1234567890">
                  <motion.span
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.8 }}
                    className="text-green-600 cursor-pointer"
                  >
                    <FiPhone size={24} />
                  </motion.span>
                </a>

              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactUsPage;
