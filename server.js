const express = require('express');
const app = express();
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const port = process.env.PORT || 3000;
const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    servers: [
      {
        url: `http://localhost:${port}`
      }
    ]
  },
  apis: ['./src/api/routes/*.js']
};
const specs = swaggerJsdoc(options);
app.use("/", swaggerUi.serve);
app.get(
  "/",
  swaggerUi.setup(specs, {
    explorer: false
  })
);

const queryParmasCaseInsensitive = require('./src/api/helpers/queryParmasCaseInsensitive');
app.use(queryParmasCaseInsensitive);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
  next();
});
const productRoutes = require('./src/api/routes/product');
app.use('/products', productRoutes);

app.use((req, res, next) => {
  const error = new Error('Resource Not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  const status = error.status || 500;
  res.status(status).json({
    error: {
      message: error.message
    }
  });
});

module.exports = app.listen(port, () => {
  console.log(`Server started - listening at http://localhost:${port}`);
});