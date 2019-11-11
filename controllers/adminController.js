module.exports.admin = function(req, res) {
  const fs = require('fs');
  var data = JSON.parse(fs.readFileSync('data/results.json', 'utf8'));

  res.render('admin.ejs', {data: data});
}


module.exports.deleteData = function(req, res) {
  var initController = require('../config/init');

  initController.initData();

  res.sendStatus(200);
}
