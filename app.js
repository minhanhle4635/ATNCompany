const express = require('express');
const engines = require('consolidate');
const app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

var publicDir = require('path').join(__dirname,'/public');
app.use(express.static(publicDir));

var uploadFileController= require('./uploadFile.js')
app.use('/upload',uploadFileController);

//npm i handlebars consolidate --save
app.engine('hbs',engines.handlebars);
app.set('views','./views');
app.set('view engine','hbs');

var productController = require("./product.js");
var indexController = require("./index.js");
var uploadFileController= require('./uploadFile.js')

app.use('/product', productController);
app.use('/index',indexController);
app.use('/upload',uploadFileController);

var server=app.listen(3000,function() {});