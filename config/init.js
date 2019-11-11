module.exports = function(app) {
  const fs = require('fs');
  var path = "data/results.json";

  // check if folder exists
  if (!fs.existsSync("data")) {
    fs.mkdirSync("data");
  }
  // check if results.json exists
  if (!fs.existsSync(path)) {
    initData();
  }

}

module.exports.initData = function() {
  initData();
}

function initData() {
  const fs = require('fs');
  var data = {
    "exercises": [[], []]
  };

  fs.writeFileSync("data/results.json", JSON.stringify(data));
}
