require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const specs = require('./swagger');
const swaggerUi = require('swagger-ui-express');
// mongoose.connect('mongodb+srv://tapanpatel:tapanpatel@mongocluster.2v9b1cl.mongodb.net/csci5709', { useNewUrlParser: true });

mongoose.connect(process.env.DBURL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to database'));

app.use(express.json());
const userRoutes = require('./routes/users');
app.use('/', userRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
  console.log(`Swagger documentation available at http://{hostname}:${port}/api-docs/`);
});
