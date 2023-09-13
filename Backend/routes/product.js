//author: Sakib Sadman <sakib.sadman@dal.ca>

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const swaggerAnnotations = require("../swagger-annotations");
const multer = require("multer");
const multerS3 = require("multer-s3");
const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const product = require("../models/product");
const user = require("../models/user");
const wishlist = require("../models/wishlist");
module.exports = router;

const s3Client = new S3Client({ region: process.env.AWS_REGION });
// Configure multer to upload file to S3
const upload = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: process.env.AWS_BUCKET_NAME,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + "-" + file.originalname);
    },
  }),
});

router.get("/product/getAll", async (req, res) => {
  product
    .find({}, { _id: 0 })
    .exec()
    .then((products) => {
      if (!products || !products.length) {
        return res
          .status(404)
          .json({ success: false, data: "No Products found!" });
      }
      return res.status(200).json({
        message: "Products retrived",
        success: true,
        products: products,
      });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

router.post("/add", upload.array("fileUpload"), async (req, res) => {
  try {
    console.log(req.body);
    let fileUploadURLs = [];

    if (req.files) {
      // fileUploadURL = `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${req.file.key}`;

      fileUploadURLs = req.files.map(
        (file) =>
          `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${file.key}`
      );
    }

    const newProduct = new product({
      productID: req.body.productID,
      productName: req.body.productName,
      fileUpload: fileUploadURLs,
      price: req.body.price,
      category: req.body.category,
      subcategory: req.body.subcategory,
      condition: req.body.condition,
      description: req.body.description,
      province: req.body.province,
      city: req.body.city,
      email: req.body.email,
    });

    // Save the new product to the database
    const savedProduct = await newProduct.save();

    res.status(201).json(savedProduct); // Respond with the saved product object
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to add product" });
  }
});

router.get("/product/:id", async (req, res) => {
  try {
    const productId = req.params.id; // Extract the product ID from the request parameters
    // console.log("Product ID:", productId);

    // Find the product with the given productID
    const foundProduct = await product.findOne({ productID: productId });
    // console.log("Found product:", foundProduct);

    if (!foundProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Return the product as JSON
    res.json(foundProduct);
  } catch (err) {
    console.error("Error retrieving product:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

//get single image for a product
router.get("/:id/fileUpload", async (req, res) => {
  const productId = req.params.id;

  try {
    const existingProduct = await product.findOne({ productID: productId });
    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if there's at least one image in fileUpload
    if (existingProduct.fileUpload && existingProduct.fileUpload.length > 0) {
      // Send back the main image URL
      return res.status(200).json({ mainImage: existingProduct.fileUpload[0] });
    } else {
      return res
        .status(404)
        .json({ message: "No main image found for this product." });
    }
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ message: "Internal server error: " + error.message });
  }
});

//get all images for a product
router.get("/:id/fileUploads", async (req, res) => {
  const productId = req.params.id;

  try {
    const existingProduct = await product.findOne({ productID: productId });
    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    // Send back the array of fileUpload URLs
    return res.status(200).json({ fileUploads: existingProduct.fileUpload });
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ message: "Internal server error: " + error.message });
  }
});

router.get("/product/getAll", async (req, res) => {
  try {
    const allProducts = await product.find();
    if (!allProducts || allProducts.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }
    return res.status(200).json({ products: allProducts });
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ message: "Internal server error: " + error.message });
  }
});

//get all products for a user
router.get("/products/getAll/:email", async (req, res) => {
  try {
    const userEmail = req.params.email;

    // Find all products with the given user
    const userProducts = await product.find({ email: userEmail });

    if (!userProducts || userProducts.length === 0) {
      return res
        .status(404)
        .json({ message: "No products found for this user" });
    }

    // Return the products as JSON
    res.json({ products: userProducts });
  } catch (err) {
    console.error("Error retrieving products by email:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

//put api for product
router.put(
  "/product/update/:productID",
  upload.array("fileUpload"),
  async (req, res) => {
    try {
      const productID = req.params.productID;

      let fileUploadURLs = [];
      if (req.files) {
        fileUploadURLs = req.files.map(
          (file) =>
            `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${file.key}`
        );
      }

      const updatedData = {
        productName: req.body.productName,
        fileUpload: fileUploadURLs.length > 0 ? fileUploadURLs : undefined,
        price: req.body.price,
        category: req.body.category,
        subcategory: req.body.subcategory,
        condition: req.body.condition,
        description: req.body.description,
        province: req.body.province,
        city: req.body.city,
        email: req.body.email,
      };

      const updatedProduct = await product.findOneAndUpdate(
        { productID: productID },
        updatedData,
        { new: true }
      );

      if (!updatedProduct) {
        return res.status(404).json({ error: "Product not found" });
      }

      res.status(200).json(updatedProduct); // Respond with the updated product object
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to update product" });
    }
  }
);

//delete api for product
router.delete("/product/delete/:productID", async (req, res) => {
  try {
    const productID = req.params.productID; // Extract the product ID from the request parameters

    // Delete the product with the given productID
    const deletedProduct = await product.findOneAndDelete({
      productID: productID,
    });

    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    // If the product has been deleted, return a success message
    res.status(200).json({ message: "Product successfully deleted" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
