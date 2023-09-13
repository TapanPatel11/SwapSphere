//author: Raj Patel <rj540530@dal.ca>

import React from "react";

const UserDetails = () => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold">User Name</h2>
      <p className="text-gray-600">Email: user1@example.com</p>
      <p className="text-gray-600">Phone: +1234567890</p>
      <div className="mt-4">
        <button className="mr-2 px-4 py-2 bg-blue-500 text-white rounded">
          User Profile
        </button>
        <button className="px-4 py-2 bg-red-500 text-white rounded">
          Report User
        </button>
      </div>
    </div>
  );
};

export default UserDetails;
