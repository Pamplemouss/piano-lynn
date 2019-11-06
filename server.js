// server.js
var express = require('express');
var app = express();
var port = 42777;
var logger = require('morgan');


app.use(express.static('public')); // setting the public folder public
app.use(logger('dev')); // log every request to the console


app.listen(port);
console.log('Listening on port ' + port);
