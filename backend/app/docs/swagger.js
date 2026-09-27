const swaggerJsdoc = require('swagger-jsdoc');
const { join } = require('path');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Library Due Date Monitor API',
      version: '1.0.0',
      description: 'API for tracking borrowed books and due dates',
    },
    servers: [{ url: 'http://localhost:3000', description: 'Local dev server' }],
    components: {
      schemas: {
        BorrowedBook: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            bookName: { type: 'string', example: 'The Hobbit' },
            borrowerName: { type: 'string', example: 'Alex' },
            dueDate: { type: 'string', format: 'date', example: '2026-10-15' },
            returned: { type: 'integer', enum: [0, 1], example: 0 },
          },
        },
        BorrowedBookInput: {
          type: 'object',
          required: ['bookName', 'borrowerName', 'dueDate'],
          properties: {
            bookName: { type: 'string' },
            borrowerName: { type: 'string' },
            dueDate: { type: 'string', format: 'date' },
            returned: { type: 'boolean' },
          },
        },
      },
    },
  },
  apis: [
    join(__dirname, '..', 'controller', 'libraryroutes.js'),
  ],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = { swaggerSpec };