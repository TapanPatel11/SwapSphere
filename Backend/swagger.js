const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'User API',
      version: '1.0.0',
      description: 'API for managing users',
    },
    servers: [
      {
        url: 'https://mongoservice-c3ky.onrender.com',
        description: 'Development server',
      },
    ],
    components: {
      schemas: {
        User: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'The unique identifier of the user',
            },
            firstName: {
              type: 'string',
              description: 'The first name of the user',
            },
            email: {
              type: 'string',
              description: 'The email address of the user',
            },
          },
          required: ['_id', 'firstName', 'email'],
        },
      },
    },
  },
  apis: ['routes/users.js'], // Replace with the correct path to the users.js file
};

const specs = swaggerJsdoc(options);

module.exports = specs;
