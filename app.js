const express = require('express');

const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

app.use(express.json()); // ===> this is a middleware . Basically middleware is basically a function that can modify the incoming request data.
app.use(express.static(`${__dirname}/public`));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use((req, res, next) => {
  // console.log('hello frrom the middleware👋');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.headers);
  next();
});

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
