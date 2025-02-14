const { Router } = require('express');
const {
	handleGetClientes,
	handleCreateCliente,
	handleUpdateCliente,
	handleDeleteCliente,
	handleSearchClientes,
} = require('../controllers/clientes.controller');
const {
	handleGetTodos,
	handleCreateTodo,
} = require('../controllers/todos.controller');
const { handleGetPersonal } = require('../controllers/personal.controller');
const {
	handleGetInmuebles,
	handleGetSingleInmueble,
	handleGetInmueblesFiltered,
} = require('../controllers/inmueble.controller');
const {
	handleLogin,
	handleRegister,
} = require('../controllers/auth.controller');
const BookController = require('../controllers/books.controller');

const RolesManager = require('../middlewares/rolesManager');
const {
	handleSendVerificationEmail,
	handleVerifyEmail,
} = require('../controllers/email.controller');
const {
	handleCreateCheckoutSession,
} = require('../controllers/gateways.controller');
const { uploader } = require('../middlewares/uploadModdleware');
const {
	handleUploadSingle,
	handleUploadMultiple,
	handleGetPublicFile,
	handleGetPrivateFile,
} = require('../controllers/upload.controller');

const router = Router();

router.get('/clientes', handleGetClientes);
router.get('/clientes/buscar', handleSearchClientes);
router.post('/clientes', handleCreateCliente);
router.put('/clientes/:id', handleUpdateCliente);
router.delete('/clientes/:id', handleDeleteCliente);

router.get('/personal/filtered', handleGetPersonal);

// inmuebles
router.get('/inmuebles', RolesManager.handleUser, handleGetInmuebles);
router.get('/inmuebles/filtered', handleGetInmueblesFiltered);
router.get('/inmuebles/:id', handleGetSingleInmueble);

router.get('/todos', handleGetTodos);
router.post('/todos', handleCreateTodo);

router.post('/auth/login', handleLogin);
router.post('/auth/register', handleRegister);

router.delete(
	'/books/delete/:id',
	RolesManager.handleAdmin,
	BookController.handleRemove
);

router.post('/send-verification-email', handleSendVerificationEmail);
router.get('/verify-email', handleVerifyEmail);

router.post('/gateways/create-checkout-session', handleCreateCheckoutSession);
router.get('/gateways/success', (req, res) => {
	res.send('<h1>Payment success</h1>');
});
router.get('/gateways/cancelled', (req, res) => {
	res.send('<h1>Payment cancelled</h1>');
});

router.post('/upload', uploader.single('file'), handleUploadSingle);
router.post('/upload/multiple', uploader.array('files'), handleUploadMultiple);

router.get('/files/public/:filename', handleGetPublicFile);
router.get('/files/private/:filename', handleGetPrivateFile);

module.exports = router;
