// config/routing.js
var pianoLynnController = require('../controllers/pianoLynnController');

module.exports = function(app) {

	// Piano Lynn
	app.get('/piano', function(req, res) {
		pianoLynnController.pianoLynn(req, res);
	});


	app.post('/saveResults', function(req, res) {
		pianoLynnController.saveResults(req, res);
	});

}
