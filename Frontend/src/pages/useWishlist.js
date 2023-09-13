import { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

const useWishlist = () => {
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const backendURL  = 'https://swapsphere-backend.onrender.com'

  const addToWishlist = async (product) => {
    try {
      console.log('==================')

      console.log(product)
      console.log('==================')
      setWishlistLoading(true);
      const email = localStorage.getItem('email');
      const productID = product.productID;

      const response = await axios.post(`${backendURL}/wishlist/addproduct`, {
        email: email,
        productID: productID,
      });

      if (response.status === 201 || response.status === 200) {
        toast.success(`${product.productName} : ${response.data.message}`);
      } else {
        toast.error(`Failed to add ${product.productName} to wishlist!`);
      }
    } catch (error) {
      toast.error(`Failed to add ${product.productName} to wishlist!`);
      console.error('There was an error!', error);
    } finally {
      setWishlistLoading(false);
    }
  };

  return { addToWishlist, wishlistLoading };
};

export default useWishlist;
