const express = require('express');
const boom = require('express-boom');
const bodyParser = require('body-parser');
const Celebrate = require('celebrate');
const bunyanMiddleware = require('bunyan-middleware');
const routes = require('./routes');
const logger = require('./lib/logger');

const app = express();

app.use(boom());
app.use(bodyParser.urlencoded({
  extended: false,
  limit: '5mb'
}));
app.use(bodyParser.json({
  limit: '5mb'
}));
app.use(routes);
app.use(Celebrate.errors());
app.use(bunyanMiddleware({
  logger
}));
app.listen(process.env.PORT, () => {
  console.log(`started server on ${process.env.PORT}`);
});
