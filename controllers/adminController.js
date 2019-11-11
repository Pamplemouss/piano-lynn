module.exports.admin = function(req, res) {
  const fs = require('fs');

  var data = JSON.parse(fs.readFileSync('data/results.json', 'utf8'));

  res.render('admin.ejs', {data: data});
}


module.exports.deleteData = function(req, res) {
  const fs = require('fs');

  var data = JSON.parse(fs.readFileSync('data/results.json', 'utf8'));
  data.time = [];

  fs.writeFileSync('data/results.json', JSON.stringify(data));
  res.sendStatus(200);
}
