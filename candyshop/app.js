var createError = require('http-errors');
const express = require('express')
const app = express();
const router = express.Router()

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var mallRouter = require('./routes/mall.js');
var usersRouter = require('./routes/users');
const productRouter = require('./routes/products.js')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', mallRouter);
// app.use('/users', usersRouter);
// app.use('/products', productRouter);

const { DataTypes } = require('sequelize');
const connection = require('./connection')
const product = require('./products.js')

const order = connection.define('order', {
  createdBy: {type: DataTypes.BOOLEAN},
  isPending: {type: DataTypes.BOOLEAN}
})

const orderItem = connection.define('orderItem', {
  orderRef: {type: DataTypes.BOOLEAN}
})

const syncTables =async ()=>{
  // await User.sync()
  await product.sync()
  await order.sync()
  await orderItem.sync()
  console.log('db synced')
}

syncTables()

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
