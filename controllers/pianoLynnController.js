module.exports.pianoLynn = function(req, res) {
  res.sendFile('piano.html', {root : './views'});
}

module.exports.saveResults = function(req, res) {
  const fs = require('fs');

  var data = req.body.averageTime;
  fs.appendFileSync('data/results', data + "\n");

  res.sendStatus(200);
}
