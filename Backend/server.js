require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const specs = require("./swagger");
const swaggerUi = require("swagger-ui-express");


// Fetch the MongoDB connection string and connect to MongoDB
(async () => {
  const mongoUri = process.env.MONGODB_URL; 
  if (!mongoUri) {
    console.error("Error: MongoDB URI is missing!");
    process.exit(1); // Exit if the secret is not found
  }

  mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to database"))
    .catch((err) => {
      console.error("Database connection error:", err);
      process.exit(1);
    });
})();
const cors = require("cors");

// mongoose.connect(process.env.DBURL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to database"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors()); // Enable CORS

const wishlistRoutes = require("./routes/wishlist");
const productRoutes = require("./routes/product");
const userRoutes = require("./routes/user");
const commentRoutes = require("./routes/comment");
const reportRoutes = require("./routes/report");
const adminRoutes = require("./routes/admin");

app.use("/wishlist", wishlistRoutes);
app.use("/user", userRoutes);
app.use("/product", productRoutes);
app.use("/comment", commentRoutes);
app.use("/report", reportRoutes);
app.use("/admin", adminRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

const port = 3500;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
  console.log(
    `Swagger documentation available at http://{hostname}:${port}/api-docs/`
  );
});
