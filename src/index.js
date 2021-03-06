var createError = require('http-errors');
const express = require('express');
const config = require('config');
const path = require('path');
const logger = require('morgan');
const store = require('./store');

var indexRouter = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.get('/', (req, res) => {
  res.render('index');
});


app.get('/shop', async (req, res) => {
  console.log('Store was hit');
 
  res.render('shop', {
    products:  await store.findAll('product', {enabled: true}),
    header: 'Print Shop'
  });
});

app.post('/contacts', (req, res ) => {
  let body =  req.body;
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

module.exports = app;
