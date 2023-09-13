//author: Raj Patel <rj540530@dal.ca>

const express = require("express");
const router = express.Router();
const user = require("../models/user");
const product = require("../models/product");
const asyncHandler = require("express-async-handler");
module.exports = router;

router.get(
  "/user/:userId",
  asyncHandler(async (req, res) => {
    const userId = req.params.userId;

    try {
      const reportedUser = await user.findById(userId);
      if (!reportedUser) {
        return res.status(404).json({ error: "User not found" });
      }
      reportedUser.noOfTimesUserReported =
        (reportedUser.noOfTimesUserReported || 0) + 1;
      await reportedUser.save();
      res.json(reportedUser);
    } catch (error) {
      res.status(500).json({ error: "Failed to update user" });
    }
  })
);

router.get(
  "/product/:productId",
  asyncHandler(async (req, res) => {
    const productId = req.params.productId;

    try {
      const reportedProduct = await product.findById(productId);
      if (!reportedProduct) {
        return res.status(404).json({ error: "Product not found" });
      }
      reportedProduct.noOfTimesProductReported =
        (reportedProduct.noOfTimesProductReported || 0) + 1;
      await reportedProduct.save();
      res.json(reportedProduct);
    } catch (error) {
      res.status(500).json({ error: "Failed to update product" });
    }
  })
);
