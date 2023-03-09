var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const Bicicleta = require('./models/bicicleta');
const Usuario = require('./models/usuario');
const Token = require('./models/token');

// const bici = Bicicleta.createInstance(1, "rojo", "urbana", [10.0, 20.0]);
// console.log(bici);

// conexion mongodb
const connectDB = require('./database/connection');
connectDB();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var bicicletasRouter = require('./routes/bicicletas');
var bicicletasAPIRouter = require('./routes/api/bicicletas');
var usuariosAPIRouter = require('./routes/api/usuarios');
var reservasAPIRouter = require('./routes/api/reservas');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/bicicletas', bicicletasRouter);
app.use('/api/bicicletas', bicicletasAPIRouter);
app.use('/api/usuarios', usuariosAPIRouter);
app.use('/api/reservas', reservasAPIRouter);

// Mongo
// const database = require('./database/connection');

// database.connect(function(db) {
//   console.log('Conexión exitosa a la base de datos.');
//   callback(db);
//   //Aquí puedes realizar operaciones con la base de datos
//   db.close();
// });



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
