const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path')

// Swagger setup
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: "Pacifique ATLP Brand Back-End APIs",
      version: "1.0.0",
      description: 'Description of your API',
    },
    servers: [
      {
        url: `http://localhost:5000`, // Update with your actual server URL
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        BearerAuth: [],
      },
    ],
  },
  apis: [path.resolve(__dirname, './routes/*.js')], // Path to the API routes folder
};

const specs = swaggerJsdoc(swaggerOptions);

// Export the Swagger specs
module.exports = specs;
