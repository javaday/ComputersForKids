const router = require('express').Router();
const db = require('../services/Database');

exports.mountPath = '/visitors';
exports.router = router;

router.route('/:id')
	.get(getVisitor)
	.put(updateVisitor);

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

function updateVisitor(req, res, next) {

	let data = Object.assign({}, req.body);

	for (let prop in data) {
		if (typeof data[prop] === 'string') {
			data[prop] = req.sanitize(data[prop]);
		}
	}

	db.visitors.updateVisitor(data)
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