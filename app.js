var createError = require('http-errors');
var express = require('express');
var partials = require('express-partials');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(partials());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, './public/weights')))
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

connectDB()
function connectDB() {
  // Connecting to the database
  mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
  }).then(() => {
    console.log("Successfully connected to the database");
  }).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    setTimeout(connectDB(), 3000)
  });
}

var mq = require("./mq_utils");
var contr = require("./controllers/smile-controller")
mq.start().then((conn) => {
  mq.listenOnQueue(contr.saveSmile);
  mq.listenOnMessagesQueue();

});

setInterval(function () {
  if (mq.MESSAGES.length > 100) {
    console.log("Clearing first 50 messages...")
    mq.MESSAGES = mq.MESSAGES.slice(50)
  }
}, 300000);


app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  console.log(err.message)
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err.message);
});

module.exports = app;
