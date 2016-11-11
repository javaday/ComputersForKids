const router = require('express').Router();
const db = require('../services/Database');

exports.mountPath = '/visitors';
exports.router = router;

router.route('/:id')
	.get(getVisitor);

router.route('/new')
    .post(newVisitor);

router.use(defaultErrorHandler);

function defaultErrorHandler(err, req, res, next) {

	res.json({
		success: false,
		error: err
	});
}

function getVisitor(req, res, next) {

	let visitorId = req.params.id || 'na';

	db.visitors.getVisitor(visitorId)	
		.then((visitor) => {
			res.json({
				success: true,
				data: visitor
			});
		})
		.catch((err) => {
			next(err);
		});
}

function newVisitor(req, res, next) {

	db.visitors.createVisitor()
		.then((visitor) => {
			res.json({
				success: true,
				data: visitor
			});
		})
		.catch((err) => {
			next(err);
		});
}