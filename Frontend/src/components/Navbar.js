// author: Utkarsh Shah <Utkarsh.Shah@dal.ca>
import React from "react";
import { Link } from "react-router-dom";
import { Transition } from "@headlessui/react";
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = React.useState(false);
  const [isToggleOpen, setIsToggleOpen] = React.useState(false);
  const [profilePicture, setProfilePicture] = useState("");


  useEffect(() => {

    const headersData = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    axios
      .get("https://swapsphere-backend.onrender.com/user/getUserDetailwithToken", headersData)
      .then((response) => {
        const userData = response.data;
        setProfilePicture(userData.userProfilePhoto);

      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleViewUserProfile = async (e) => {
    navigate("/user/userprofile");
  };
  const handleLogout = async (e) => {
    console.log("Flag")
    e.preventDefault();
    const tokenrequest = {
      token: localStorage.getItem("authToken"),
    };
    try {
      console.log(tokenrequest.token)
      const response = await axios.post('https://swapsphere-backend.onrender.com/user/deleteTokens', tokenrequest);
      console.log(response);

      if (response.data.status === 'true') {
        localStorage.setItem('authToken', ' ');
        navigate("/user/login");
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        console.log(error);
      }
    }
  };

  const userToggleDrop = () => {
    setIsToggleOpen((isToggleOpen) => !isToggleOpen);
  };

  return (
    <nav className="bg-gray-800 fixed top-0 w-full">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-14">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0 flex items-center">
              {/* Logo */}
              <Link to="/home" className="flex items-center">
                <h1 className="text-white font-bold text-xl italic">
                  Swap Sphere
                </h1>
              </Link>
            </div>
            <div className="hidden sm:block sm:ml-6 mt-2 space-x-4">
              {/* Navigation links */}
              <Link
                to="/home"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Home
              </Link>
              <Link
                to="/about"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Contact
              </Link>
              <Link
                to="/faq"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                FAQ
              </Link>
            </div>
          </div>
          <div className="flex-1 flex sm:justify-end">
            {/* Search bar and wishlist section */}
            <div className="relative flex items-center w-full sm:w-auto">
              {/* Search bar */}
              <div className="relative flex items-center w-full h-8 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
                {/* Search icon */}
                <div className="grid place-items-center h-full w-12 text-gray-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 20 20"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                {/* Search input */}
                <input
                  className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
                  type="text"
                  id="search"
                  placeholder="Search"
                />
              </div>

              {/* Wishlist section */}
              <Link
                to="/wishlist"
                className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 ml-3"
              >
                <span className="sr-only">Open wishlist</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                  />
                </svg>
                {/* Wishlist count */}
              </Link>
            </div>

            {/* User menu and New listing section */}
            <div className="relative ml-3">
              {/* Profile dropdown */}
              <div>
                <button
                  type="button"
                  className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  id="user-menu-button"
                  aria-expanded={isToggleOpen}
                  aria-haspopup="true"
                  onClick={userToggleDrop}
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="h-8 w-8 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                </button>
              </div>

              {/* User menu dropdown */}
              {isToggleOpen && (
                <div
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu-button"
                  tabIndex="-1"
                >
                  {/* Dropdown menu items */}
                  <div
                    className="block px-4 py-2 text-sm text-gray-700"
                    role="menuitem"
                    tabIndex="-1"
                    id="user-menu-item-0"
                    onClick={handleLogout}
                  >
                    Logout
                  </div>
                  <a
                    href="/settings"
                    className="block px-4 py-2 text-sm text-gray-700"
                    role="menuitem"
                    tabIndex="-1"
                    id="user-menu-item-1"
                  >
                    Settings
                  </a>
                </div>
              )}
            </div>

            {/* New listing section */}
            <div className="relative ml-3">
              <Link
                to="/createListing"
                className="flex bg-blue-300 hover:bg-blue-500 text-black font-bold py-1 px-3 rounded text-xs sm:text-sm w-auto"
              >
                New Listing
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <Transition
        show={isOpen}
        enter="transition duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        {(ref) => (
          <div className="sm:hidden" ref={ref}>
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/"
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Home
              </Link>
              <Link
                to="/about"
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </Transition>
    </nav>
  );
}
