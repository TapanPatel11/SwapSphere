//author: Raj Patel <rj540530@dal.ca>

import React, { useState } from "react";
import product_image from "../images/tomato.jpeg";
import product_image1 from "../images/flower.jpeg";
import product_image2 from "../images/fries.jpeg";

const ImagePanel = () => {
  const [selectedImage, setSelectedImage] = useState(0);

  const images = [product_image, product_image1, product_image2];

  const handleImageClick = (index) => {
    setSelectedImage(index);
  };

  return (
    <div className="flex flex-col">
      <div className="w-full">
        <img src={images[selectedImage]} alt="Selected" className="w-25 h-25" />
      </div>
      <div className="w-full flex flex-wrap mt-4">
        {images.map((image, index) => (
          <div
            key={index}
            className={`w-1/4 cursor-pointer p-1 ${
              index === selectedImage ? "border-2 border-blue-500" : ""
            }`}
            onClick={() => handleImageClick(index)}
          >
            <img src={image} alt={`Image ${index + 1}`} className="w-25 h-25" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImagePanel;
