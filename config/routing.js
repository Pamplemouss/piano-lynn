// config/routing.js
var pianoController = require('../controllers/pianoController');
var adminController = require('../controllers/adminController');

module.exports = function(app) {

	// Piano Lynn
	app.get('/exercice1', function(req, res) {
		pianoController.exercice1(req, res);
	});

	app.post('/saveResults', function(req, res) {
		pianoController.saveResults(req, res);
	});

	app.get('/exercice2', function(req, res) {
		pianoController.exercice2(req, res);
	});


	// Admin
	app.get('/admin', function(req, res) {
		adminController.admin(req, res);
	});

	app.post('/deleteData', function(req, res) {
		adminController.deleteData(req, res);
	});
}
