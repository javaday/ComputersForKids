const router = require('express').Router();
const db = require('../services/Database');

exports.mountPath = '/paypal';
exports.router = router;

router.route('/donation')
    .post(saveDonation);

router.use(defaultErrorHandler);

function defaultErrorHandler(err, req, res, next) {

	res.json({
		success: false,
		error: err
	});
}

function saveDonation(req, res, next) {

	db.donations.createDonation({
		body: req.body,
		query: req.query
	});

	res.json({success: true});
}