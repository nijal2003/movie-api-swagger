const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Movie Management API',
      version: '1.0.0',
      description: 'A simple CRUD API for managing movies with validation and Swagger docs.',
    },
    servers: [
      { url: 'http://localhost:3000', description: 'Local server' }
    ],
  },
  // Scan JSDoc comments for OpenAPI annotations:
  apis: ['./src/routes/*.js', './src/models/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = { swaggerSpec };
