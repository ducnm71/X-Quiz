var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const { errorMiddleware } = require('./middleware/errorMiddleware');
const connectDB = require('./config/database');

const userRouter = require('./routes/userRouter');
const questionRouter = require('./routes/questionRouter')
const zoomRouter = require('./routes/zoomRouter')
const playerRouter = require('./routes/playerRouter')

//  Connect DB
connectDB();

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/user', userRouter);
app.use('/question', questionRouter);
app.use('/zoom', zoomRouter);
app.use('/player', playerRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

//error Middleware
app.use(errorMiddleware);

module.exports = app;
