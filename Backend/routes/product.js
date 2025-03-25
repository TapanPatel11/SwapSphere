// Import necessary modules
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const swaggerAnnotations = require("../swagger-annotations");
const multer = require("multer");
const { BlobServiceClient } = require("@azure/storage-blob");
const product = require("../models/product");
const user = require("../models/user");
const wishlist = require("../models/wishlist");
const { getSecretValue } = require('../server'); // Import getSecretValue from server.js
module.exports = router;

// Function to get secrets from Azure Key Vault
async function getAzureSecrets() {
  const storageConnectionString = await getSecretValue("AZURE-STORAGE-CONNECTION-STRING");
  const containerName = await getSecretValue("AZURE-CONTAINER-NAME");
  const storageURL = await getSecretValue("AZURE-STORAGE-URL");


  return { storageConnectionString, containerName };
}

// Configure multer to handle file uploads
const storage = multer.memoryStorage(); // Use memory storage to upload files into memory before sending them to Azure Blob Storage
const upload = multer({ storage: storage });

router.get("/product/getAll", async (req, res) => {
  try {
    const products = await product.find({}, { _id: 0 }).exec();
    if (!products || !products.length) {
      return res.status(404).json({ success: false, data: "No Products found!" });
    }
    return res.status(200).json({
      message: "Products retrieved",
      success: true,
      products: products,
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post("/add", upload.array("fileUpload"), async (req, res) => {
  try {
    const { storageConnectionString, containerName } = await getAzureSecrets(); // Fetch the secrets from Azure Key Vault
    const blobServiceClient = BlobServiceClient.fromConnectionString(storageConnectionString);

    // Create a container reference
    const containerClient = blobServiceClient.getContainerClient(containerName);

    let fileUploadURLs = [];

    if (req.files) {
      // Upload files to Azure Blob Storage and get URLs
      fileUploadURLs = await Promise.all(
        req.files.map(async (file) => {
          const blobName = Date.now().toString() + "-" + file.originalname;
          const blockBlobClient = containerClient.getBlockBlobClient(blobName);

          await blockBlobClient.uploadData(file.buffer, {
            blobHTTPHeaders: { blobContentType: file.mimetype },
          });

          return `${storageURL}/${containerName}/${blobName}`;
        })
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

    const savedProduct = await newProduct.save();

    res.status(201).json(savedProduct); // Respond with the saved product object
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to add product" });
  }
});

// Endpoint to get product by ID
router.get("/product/:id", async (req, res) => {
  try {
    const productId = req.params.id;

    const foundProduct = await product.findOne({ productID: productId });

    if (!foundProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(foundProduct);
  } catch (err) {
    console.error("Error retrieving product:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Endpoint to get the main image for a product
router.get("/:id/fileUpload", async (req, res) => {
  const productId = req.params.id;

  try {
    const existingProduct = await product.findOne({ productID: productId });
    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (existingProduct.fileUpload && existingProduct.fileUpload.length > 0) {
      return res.status(200).json({ mainImage: existingProduct.fileUpload[0] });
    } else {
      return res.status(404).json({ message: "No main image found for this product." });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error: " + error.message });
  }
});

// Endpoint to get all images for a product
router.get("/:id/fileUploads", async (req, res) => {
  const productId = req.params.id;

  try {
    const existingProduct = await product.findOne({ productID: productId });
    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json({ fileUploads: existingProduct.fileUpload });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error: " + error.message });
  }
});

// Update product information
router.put("/product/update/:productID", upload.array("fileUpload"), async (req, res) => {
  try {
    const productID = req.params.productID;

    const { storageConnectionString, containerName } = await getAzureSecrets(); // Fetch the secrets from Azure Key Vault
    const blobServiceClient = BlobServiceClient.fromConnectionString(storageConnectionString);

    // Create a container reference
    const containerClient = blobServiceClient.getContainerClient(containerName);

    let fileUploadURLs = [];
    if (req.files) {
      fileUploadURLs = await Promise.all(
        req.files.map(async (file) => {
          const blobName = Date.now().toString() + "-" + file.originalname;
          const blockBlobClient = containerClient.getBlockBlobClient(blobName);

          await blockBlobClient.uploadData(file.buffer, {
            blobHTTPHeaders: { blobContentType: file.mimetype },
          });

          return `${storageURL}/${containerName}/${blobName}`;
        })
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
});

// Delete product by ID
router.delete("/product/delete/:productID", async (req, res) => {
  try {
    const productID = req.params.productID;

    const deletedProduct = await product.findOneAndDelete({ productID: productID });

    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json({ message: "Product successfully deleted" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
