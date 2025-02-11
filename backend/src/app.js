require('../docs/routes/index.routes');

const express = require('express');
const morgan = require('morgan');
const routes = require('./routes/routes');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const { errorMiddleware } = require('./middlewares/errorMiddleware');
const { logsMiddleware } = require('./middlewares/logsMiddleware');
const { specs } = require('../docs/swaggerConfig');

const app = express();

// middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(logsMiddleware);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// routes
app.use('/api/v2', routes);

app.use(errorMiddleware);

module.exports = app;
