// noinspection ES6ConvertVarToLetConst

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')

const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const postRouter = require('./routes/post')
const playerRouter = require('./routes/player')
const teamRouter = require('./routes/team')

var bodyParser = require('body-parser');


var app = express();

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({
  allowedHeaders: 'Origin, x-requested-with, Content-Type, X-Token',
  credentials: true}
))

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/post',postRouter);
app.use('/player',playerRouter);
app.use('/team',teamRouter);



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
