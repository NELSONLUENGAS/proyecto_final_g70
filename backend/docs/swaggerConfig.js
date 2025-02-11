const swaggerJsdoc = require('swagger-jsdoc');
const schemas = require('./swaggerSchemas');

const options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'Documentación API',
			version: '1.0.0',
			description: 'Como se usa esta API',
		},
		components: {
			securitySchemes: {
				bearerAuth: {
					type: 'http',
					scheme: 'bearer',
					bearerFormat: 'JWT',
				},
			},
			schemas,
		},
		paths: {},
	},
	apis: [],
};

const specs = swaggerJsdoc(options);

const addSwaggerPath = (path, method, config, requiresAuth = false) => {
	if (!specs.paths[path]) {
		specs.paths[path] = {};
	}

	if (requiresAuth) {
		config.security = [{ bearerAuth: [] }];
	}

	specs.paths[path][method] = config;
};

module.exports = {
	specs,
	addSwaggerPath,
};
