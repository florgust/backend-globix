const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Globix API',
      version: '1.0.0',
      description: 'Documentação completa da API do sistema GLOBIX.',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./src/docs/*.swagger.ts'],
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;