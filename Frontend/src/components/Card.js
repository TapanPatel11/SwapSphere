// author: Utkarsh Shah <Utkarsh.Shah@dal.ca>
import React from "react";
import { useNavigate } from 'react-router-dom';
export default function Card({ title, imageSrc, price, location, email, productID }) {
  const navigate = useNavigate();
  const handleCardClick = () => {
    console.log(email, productID)
    navigate("/product", { state: { email, productID } });
  };
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg" onClick={handleCardClick}>
      <img className="w-full  h-48 object-contain" src={imageSrc} alt={title} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">
          <span className="font-semibold">Price: </span><strong>${price}</strong>
        </p>
        <p className="text-gray-700 text-base">
          <span className="font-semibold">Location:</span> {location}
        </p>
      </div>
    </div >
  );
}
