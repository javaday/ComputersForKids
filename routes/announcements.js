const router = require('express').Router();
const db = require('../services/Database');

exports.mountPath = '/announcements';
exports.router = router;

router.route('/new')
    .post(newAnnouncement);

router.route('/:id')
    .get(getAnnouncement)
    .put(updateAnnouncement);

router.use(defaultErrorHandler);

function defaultErrorHandler(err, req, res, next) {

	res.json({
		success: false,
		error: err
	});
}

function getAnnouncement(req, res, next) {

    let announcementId = req.params.id || 'na';

    db.announcements.getAnnouncement(announcementId)
        .then((announcement) => {
            res.json(announcement);
        })
        .catch((err) => {
            next(err);
        });
}

function newAnnouncement(req, res, next) {

	let data = Object.assign({}, req.body);

    for (let prop in data) {
        if (typeof data[prop] === 'string') {
            data[prop] = req.sanitize(data[prop]);
        }
    }
	
    db.announcements.createAnnouncement(data)
        .then((announcement) => {
            res.json(announcement);
        })
        .catch((err) => {
            next(err);
        });
}

function updateAnnouncement(req, res, next) {

    let data = Object.assign({}, req.body);

    for (let prop in data) {
        if (typeof data[prop] === 'string') {
            data[prop] = req.sanitize(data[prop]);
        }
    }

    db.announcements.updateAnnouncement(data)
        .then((announcement) => {
            res.json(announcement);
        })
        .catch((err) => {
            next(err);
        });
}