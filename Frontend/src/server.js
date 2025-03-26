require('dotenv').config();
const express = require('express');
const app = express();
const specs = require('swagger');
const swaggerUi = require('swagger-ui-express');
const backendURL = process.env.BACKEND_URL;

app.use(express.json());
const userRoutes = require('./routes/users');
app.use('/', userRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
  console.log(`Swagger documentation available at http://{hostname}:${port}/api-docs/`);
});
