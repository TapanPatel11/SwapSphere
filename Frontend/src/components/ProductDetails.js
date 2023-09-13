//author: Raj Patel <rj540530@dal.ca>

import React from "react";
import { useLocation } from "react-router-dom";
const ProductDetails = () => {
  const location = useLocation();
  const { email, productID } = location.state;
  console.log(email, productID);
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold">Product 1</h2>
      <p className="text-gray-600">
        Product Info Product Info Product Info Product Info Product Info Product
        Info Product Info Product Info Product Info Product Info Product Info
        Product Info Product Info Product Info.
      </p>
      <p className="text-gray-800 font-bold">$99.99</p>
      <p className="text-gray-500">Category: Food</p>
      <div className="mt-4">
        <button className="mr-2 px-4 py-2 bg-blue-500 text-white rounded">
          Add to Wishlist
        </button>
        <button className="mr-2 px-4 py-2 bg-gray-500 text-white rounded">
          Share
        </button>
        <button className="px-4 py-2 bg-red-500 text-white rounded">
          Report Item
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
