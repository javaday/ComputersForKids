const router = require('express').Router();
const passport = require('passport');
const path = require('path');
const fs = require('fs');
const multer  = require('multer');
const db = require('../services/Database');

const rootPath = path.join(__dirname, '../public/files');

exports.mountPath = '/files';
exports.router = router;

let storage = multer.diskStorage({
	destination: function (req, file, cb) {
				
		if (!fs.existsSync(rootPath)) {
			fs.mkdirSync(rootPath);
		}

		cb(null, dir)
	},
	filename: function (req, file, cb) {
		
		let ext = path.extname(file.originalname);
		let fileName = file.originalname.replace(ext, '-' + Date.now()) + ext;
		
		fileName = fileName.replace(/ /g, '-');
		
		cb(null, fileName)
	}
});

let upload = multer({ 
	storage: storage,
	limits: {
		fileSize: 100000000
	}
});

router.route('/upload')
    .post([
		authorize,
		upload.single('file'), 
		uploadFile
	]);
	
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

function authorize(req, res, next) {

    if (req.user && req.user.roles && req.user.roles.admin) {
		next();
    }
    else {
        next('Access Denied');
	}
    
}

function uploadFile(req, res, next) {
	
	req.file.path = req.file.path.replace(rootPath, '');
	
	res.json({ success: true, data: req.file });
}