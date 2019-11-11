module.exports.pianoLynn = function(req, res) {
  res.sendFile('piano.html', {root : './views'});
}

module.exports.saveResults = function(req, res) {
  const fs = require('fs');
  var newTime = req.body.averageTime;
  var data = JSON.parse(fs.readFileSync('data/results.json', 'utf8'));

  data.time.push(newTime);

  fs.writeFileSync('data/results.json', JSON.stringify(data));

  res.sendStatus(200);
}
