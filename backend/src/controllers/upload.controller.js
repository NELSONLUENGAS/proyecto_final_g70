const { getToken, verifyToken } = require('../helpers/jwt');
const path = require('path');

const handleUploadSingle = async (req, res, next) => {
	try {
		const type = req.query.type;
		const file = req.file;

		if (!file) {
			return res.status(400).json({ message: 'No se subió ningún archivo' });
		}

		const baseUrl = `${req.protocol}://${req.get('host')}`;
		const fileDir = type === 'private' ? 'private' : 'public';

		const fileUrl = `${baseUrl}/api/v2/files/${fileDir}/${file.filename}`;

		res.status(200).json({
			message: 'Archivo subida correctamente',
			url: fileUrl,
		});
	} catch (error) {
		next(error);
	}
};

const handleUploadMultiple = async (req, res, next) => {
	try {
		const type = req.query.type;
		const files = req.files;

		if (!files || !files?.length) {
			return res.status(400).json({ message: 'No se subieron archivos' });
		}

		const baseUrl = `${req.protocol}://${req.get('host')}`;

		const filesUrls = files.map((file) => {
			const fileDir = type === 'private' ? 'private' : 'public';
			const fileUrl = `${baseUrl}/api/v2/files/${fileDir}/${file.filename}`;

			return fileUrl;
		});

		res.status(200).json({
			message: 'Archivos subidos correctamente',
			urls: filesUrls,
		});
	} catch (error) {
		next(error);
	}
};

const handleGetPublicFile = async (req, res, next) => {
	try {
		const { filename } = req.params;

		res.sendFile(path.join(__dirname, '../..', 'uploads', 'public', filename));
	} catch (error) {
		next(error);
	}
};

const handleGetPrivateFile = async (req, res, next) => {
	try {
		const token = getToken(req);
		verifyToken(token);

		const { filename } = req.params;

		res.sendFile(path.join(__dirname, '../..', 'uploads', 'private', filename));
	} catch (error) {
		next(error);
	}
};

module.exports = {
	handleUploadSingle,
	handleUploadMultiple,
	handleGetPublicFile,
	handleGetPrivateFile,
};
