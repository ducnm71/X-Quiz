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

const refreshTokenRouter = require('./routes/refreshTokenRouter');
const userRouter = require('./routes/userRouter');
const questionRouter = require('./routes/questionRouter');
const zoomRouter = require('./routes/zoomRouter');
const playerRouter = require('./routes/playerRouter');
const clientRouter = require('./routes/clientRouter')

//  Connect DB
connectDB();

var app = express();
const {Server} = require('socket.io')
const http = require('http')
const httpServer = http.createServer(app)
const io = new Server(httpServer)




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  }),
);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/user', userRouter);
app.use('/token', refreshTokenRouter);
app.use('/question', questionRouter);
app.use('/zoom', zoomRouter);
app.use('/player', playerRouter);
app.use('/', clientRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

//error Middleware
app.use(errorMiddleware);

module.exports = {app, httpServer, io};
