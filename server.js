// server.js
var express = require('express');
var app = express();
var logger = require('morgan');

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}


app.use(express.static('public')); // setting the public folder public
app.use(logger('dev')); // log every request to the console


app.listen(port);
console.log('Listening on port ' + port);
