const router = require('express').Router();
const db = require('../services/Database');

exports.mountPath = '/cosplay';
exports.router = router;

router.route('/schedule')
	.get(getSchedule);

router.route('/signup')
	.post(addSignup);

router.use(defaultErrorHandler);

function defaultErrorHandler(err, req, res, next) {

	res.json({
		success: false,
		error: err
	});
}

function getSchedule(req, res, next) {

}

function addSignup(req, res, next) {

	db.create('cosplay', req.body)
		.then((newItem) => {
			res.json(newItem);
		})
		.catch((err) => {
			next(err);
		});
}