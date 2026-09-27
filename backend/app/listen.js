const cors = require('cors');
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const { swaggerSpec } = require('./docs/swagger.js');
const { libraryRoutes } = require('./controller/libraryroutes.js');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/', libraryRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use((err, req, res, next) => {
  console.log(err);
  const status = err.statusCode || 500;
  res.status(status).json({ error: err.message });
});

module.exports = { app };