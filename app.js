const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const COOKIE_SECRET = process.env.COOKIE_SECRET || 'secret';

const mongoSessionConfig = require('./src/middlewares/mongo.middleware');
const routerIndex = require('./src/router/index');
const errorHandler = require('./src/middlewares/error.middleware');
const noPageFound = require('./src/middlewares/noPage.middleware');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(logger('dev'));

app.use("/public", express.static(__dirname + "/public"));

app.use(session(mongoSessionConfig))

app.use(cookieParser(COOKIE_SECRET));
app.use('/api',routerIndex);

app.use(errorHandler);
app.use(noPageFound);

module.exports = app;