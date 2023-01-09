const express = require('express');
const routerIndex = require('./src/router/index');
const errorHandler = require('./src/middlewares/error.middleware');
const noPageFound = require('./src/middlewares/noPage.middleware');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/public", express.static(__dirname + "/public"));

app.use('/api',routerIndex);

app.use(errorHandler);
app.use(noPageFound);

module.exports = app;