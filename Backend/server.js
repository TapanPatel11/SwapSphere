require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const fs = require("fs"); // To read the secret from the file
const specs = require("./swagger");
const swaggerUi = require("swagger-ui-express");

// Fetch the MongoDB connection string from the mounted secret file
(async () => {
  const mongoUriPath = "/mnt/secrets/swapsphere-mongodb-uri"; // Path to the secret
  let mongoUri;
  
  try {
    mongoUri = fs.readFileSync(mongoUriPath, 'utf8').trim(); // Read the secret file and trim any extra whitespace
  } catch (error) {
    console.error(`Error reading MongoDB URI from ${mongoUriPath}:`, error);
    process.exit(1); // Exit if the secret cannot be read
  }

  if (!mongoUri) {
    console.error("Error: MongoDB URI is missing!");
    process.exit(1); // Exit if the secret is empty
  }

  mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to database"))
    .catch((err) => {
      console.error("Database connection error:", err);
      process.exit(1);
    });
})();

const cors = require("cors");

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

const port = 8080;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
  console.log(
    `Swagger documentation available at http://{hostname}:${port}/api-docs/`
  );
});
