const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		const type = req.query.type;
		if (type === 'private') {
			cb(null, path.join(__dirname, '../..', 'uploads', 'private'));
		} else {
			cb(null, path.join(__dirname, '../..', 'uploads', 'public'));
		}
	},
	filename: (req, file, cb) => {
		cb(null, `${Date.now()}-${file.originalname}`);
	},
});

const uploader = multer({ storage });

module.exports = {
	uploader,
};
