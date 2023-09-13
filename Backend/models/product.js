//author: Sakib Sadman <sakib.sadman@dal.ca>

const mongoose = require("mongoose");

const product = new mongoose.Schema({
  productID: {
    type: String,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },

  fileUpload: {
    type: [String],
    required: false,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  subcategory: {
    type: String,
    required: true,
  },
  condition: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  province: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  noOfTimesProductReported: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Product", product);
