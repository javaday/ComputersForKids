const router = require('express').Router();
const db = require('../services/Database');

exports.mountPath = '/users';
exports.router = router;

router.route('/register')
    .post(registerUser);

router.use(defaultErrorHandler);

function defaultErrorHandler(err, req, res, next) {

    if (req.xhr) {
        res.status(500).send({
            error: err
        });
    } else {
        next(err);
    }
}

function getCurrentUser(req, res, next) {
	
	if (req.user) {
		// user is logged in	
		res.json(req.user);
	}
	else {
		// no user logged in
		res.json({});
	}
}

function registerUser(req, res, next) {

	let data = {
		email: req.body.email,
		password: req.body.password
	};

    db.users.createUser(data)
        .then((user) => {
            res.json(user);
        })
        .catch((err) => {
            next(err);
        });
}
