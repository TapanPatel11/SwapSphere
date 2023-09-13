const express = require('express')
const router = express.Router()
const swaggerAnnotations = require('../swagger-annotations');
const product = require('../models/product');
const user = require('../models/user');
const wishlist = require('../models/wishlist');






module.exports = router

// add a new product to the wishlist 
router.post('/addproduct', async (req, res) => {
    const { email, productID } = req.body;
  
    try {
      // Find the user based on the provided email
      const existingUser = await user.findOne({ email });
      if (!existingUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Find the product based on the provided productID
      const existingProduct = await product.findOne({ productID });
      if (!existingProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      // Check if the wishlist already exists for the user
      let existingWishlist = await wishlist.findOne({ wishlistID: email });
  
      console.log('existingUser:', existingUser);
      console.log('existingWishlist:', existingWishlist);
  
      if (existingWishlist) {
        // Check if the product already exists in the wishlist
        if (existingWishlist.products.includes(existingProduct._id)) {
          return res.status(200).json({ message: 'Product already exists in the wishlist' });
        }
  
        // Wishlist exists, add the product to the existing wishlist's products array
        existingWishlist.products.push(existingProduct._id);
      } else {
        // Wishlist does not exist, create a new wishlist entry
        existingWishlist = new wishlist({
          user: existingUser._id,
          wishlistID: email,
          products: [existingProduct._id]
        });
      }
  
      await existingWishlist.save();
      return res.status(200).json({ message: 'Product added to wishlist' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal server error: ' + error.message });
    }
  });
  
  



//remove the product from the exisitng wishlist
  router.post('/removeproduct', async (req, res) => {
    const { email, productID } = req.body;
  
    try {
      // Find the user based on the provided email
      const existingUser = await user.findOne({ email });
      if (!existingUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Find the product based on the provided productID
      const existingProduct = await product.findOne({ productID });
      if (!existingProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      // Check if the wishlist exists for the user
      let existingWishlist = await wishlist.findOne({ wishlistID: email });
  
      console.log('existingUser:', existingUser);
      console.log('existingWishlist:', existingWishlist);
  
      if (existingWishlist) {
        // Check if the product exists in the wishlist
        if (!existingWishlist.products.includes(existingProduct._id)) {
          return res.status(200).json({ message: 'Product does not exist in the wishlist' });
        }
  
        // Remove the product from the wishlist
    existingWishlist.products = existingWishlist.products.filter((productId) => {
      if (productId.toString() !== existingProduct._id.toString()) {
        console.log(existingProduct._id+'====', productId.toString());

        return true;
      }

      return false;
    }); 
  
        await existingWishlist.save();
        return res.status(200).json({ message: 'Product removed from wishlist' });
      } else {
        return res.status(404).json({ message: 'Wishlist not found' });
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal server error: ' + error.message });
    }
  });
  
 




  //get all wishlist items of a particular user by email as ID
  router.get('/getwishlist/:email', async (req, res) => {
    const email = req.params.email;
  
    try {
    //   console.log(email);
      // Find the wishlist based on the provided email
      const existingWishlist = await wishlist.findOne({ wishlistID: email }).populate('products');
  
      if (!existingWishlist) {
        return res.status(404).json({ message: 'Wishlist not found' });
      }
  
      // Return the wishlist products
      return res.status(200).json({ products: existingWishlist.products });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal server error: ' + error.message });
    }
  });
  
  
