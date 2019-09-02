const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const fetch = require('node-fetch');

const app = express();

const hbs = handlebars.create({
  defaultLayout: 'layout', // --> базовый шаблон
  extname: 'hbs', // --> какое расширение
  layoutsDir: path.join(__dirname, 'views'), // путь, где будут лежать шаблоны
  partialsDir: path.join(__dirname, 'views'), // путь, где будут лежать кусочные шаблоны
});

const indexRouter = require('./routes/index');
const port = 3000;


app.engine('hbs', hbs.engine);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(morgan('dev'));
app.use('/', indexRouter);
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());



app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`)
});
