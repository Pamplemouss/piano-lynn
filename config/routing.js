// config/routing.js
var pianoLynnController = require('../controllers/pianoLynnController');
var adminController = require('../controllers/adminController');

module.exports = function(app) {

	// Piano Lynn
	app.get('/piano', function(req, res) {
		pianoLynnController.pianoLynn(req, res);
	});

	app.post('/saveResults', function(req, res) {
		pianoLynnController.saveResults(req, res);
	});


	// Admin
	app.get('/admin', function(req, res) {
		adminController.admin(req, res);
	});

	app.post('/deleteData', function(req, res) {
		adminController.deleteData(req, res);
	});
}
