//author: Raj Patel <rj540530@dal.ca>

const express = require("express");
const router = express.Router();
const user = require("../models/user");
const product = require("../models/product");
const asyncHandler = require("express-async-handler");
module.exports = router;

router.get(
  "/getAllReportedUsers",
  asyncHandler(async (req, res) => {
    try {
      const users = await user.find({ noOfTimesUserReported: { $gt: 0 } });
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch reported users" });
    }
  })
);

router.get(
  "/getAllReportedProducts",
  asyncHandler(async (req, res) => {
    try {
      const products = await product.find({
        noOfTimesProductReported: { $gt: 0 },
      });
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch reported products" });
    }
  })
);

router.delete(
  "/deleteUser/:userId",
  asyncHandler(async (req, res) => {
    const userId = req.params.userId;

    try {
      const deletedUser = await user.findByIdAndDelete(userId);
      if (!deletedUser) {
        return res.status(404).json({ error: "User not found" });
      }

      await product.deleteMany({ email: deletedUser.email });

      res.json(deletedUser);
    } catch (error) {
      res.status(500).json({ error: "Failed to delete user" });
    }
  })
);

router.delete(
  "/deleteProduct/:productId",
  asyncHandler(async (req, res) => {
    const productId = req.params.productId;
    console.log(productId);

    try {
      const deletedProduct = await product.findByIdAndDelete(productId);
      if (!deletedProduct) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.json(deletedProduct);
    } catch (error) {
      res.status(500).json({ error: "Failed to delete product" });
    }
  })
);
