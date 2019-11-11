module.exports.admin = function(req, res) {
  const fs = require('fs');
  var path = "data/results.json";
  var data;

  // check if folder exists
  if (!fs.existsSync("data")) {
    fs.mkdirSync("data");
  }

  // check if results.json exists
  if (!fs.existsSync(path)) {
    fs.writeFileSync(path, JSON.stringify({"time":[]}));
    data = {"time":[]};
  }
  else {
    data = JSON.parse(fs.readFileSync('data/results.json', 'utf8'));
  }

  res.render('admin.ejs', {data: data});
}


module.exports.deleteData = function(req, res) {
  const fs = require('fs');
  var data = {"time": []};

  fs.writeFileSync('data/results.json', JSON.stringify(data));
  res.sendStatus(200);
}
