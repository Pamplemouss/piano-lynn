module.exports.exercice1 = function(req, res) {
  res.sendFile('piano/findNote.html', {root : './views'});
}

module.exports.exercice2 = function(req, res) {
  res.sendFile('piano/findKey.html', {root : './views'});
}

module.exports.saveResults = function(req, res) {
  const fs = require('fs');
  var result = req.body;
  var path = "data/results.json";
  var data = JSON.parse(fs.readFileSync(path, 'utf8'));

  data.exercises[result.exercise-1].push({
    "averageTime": result.averageTime
  });

  fs.writeFileSync(path, JSON.stringify(data));

  res.sendStatus(200);
}
