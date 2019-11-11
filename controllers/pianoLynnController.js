module.exports.pianoLynn = function(req, res) {
  res.sendFile('piano.html', {root : './views'});
}

module.exports.saveResults = function(req, res) {
  const fs = require('fs');
  var newTime = req.body.averageTime;
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


  if (!fs.existsSync(path)) {
    fs.mkdirSync("data");
    data = {"time":[]};
  }
  else {
    data = JSON.parse(fs.readFileSync('data/results.json', 'utf8'));
  }

  data.time.push(newTime);
  fs.writeFileSync('data/results.json', JSON.stringify(data));

  res.sendStatus(200);
}
