var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var lessMiddleware = require('less-middleware');
var logger = require('morgan');

var cRouter = require('./routes/clase');
var hRouter = require('./routes/horario');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/H', hRouter);
app.use('/C', cRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.render("msg", { msg: "Error 404", des: "pagina no encontrada", lnk: "/H/", lnkD: "Volver" })
});

// error handler
app.use(function(err, req, res, next) {
  console.log(err);
  res.render("msg", { msg: "Error 503", des: "Ha ocurrido un error interno", lnk: "/H", lnkD: "Volver" })
});

module.exports = app;
