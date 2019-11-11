/***********************************
; Title:  app.js
; Author: Kurt Leadley, Richard Krasso
; Date:   25 October 2019
; Description: node, view engine and mongoose handlers
; NOTE: navigate to api-gateway in your command prompt and type these commands
; Enter: SET DEBUG=api-gateway:*
; Enter: npm run devstart
; GET request:
; curl -X GET localhost:3000/api/auth/token
; (curl commands don't work in your powershell)
***************************************/
// require and display my header
const header = require('./leadley-header.js');
var outputHeader = header.display("Kurt","Leadley","web-340-app.js");
console.log(outputHeader);
console.log('');
// require and import
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var indexRouter = require('./routes/index');
// NEW - require the apiCatalog which has a GET and POST method associated with the user.js model
var apiCatalog = require('./routes/api-catalog');

var app = express();

// connect to our mongoose db
mongoose.connect('mongodb+srv://admin:admin@buwebdev-cluster-1-klsvt.mongodb.net/ems', {
    promiseLibrary: require('bluebird')
}).then ( () => console.log('connection successful'))
  .catch( (err) => console.error(err));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// use statements
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', apiCatalog);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler, debugger
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
// export the app
module.exports = app;
