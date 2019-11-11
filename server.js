// server.js
var express = require('express');
var app = express();
var logger = require('morgan');
var bodyParser = require('body-parser');

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}


app.use(express.static('public')); // setting the public folder public
app.use(logger('dev')); // log every request to the console

// plugin for formating data in POST request
app.use(bodyParser.urlencoded({
  limit: '5mb',
  extended: true
}));
app.use(bodyParser.json());
app.set('view engine', 'ejs'); // set up ejs for templating

require('./config/init.js')(app);
require('./config/routing.js')(app);

app.listen(port);
console.log('Listening on port ' + port);
