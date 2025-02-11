const { addSwaggerPath } = require('../swaggerConfig');

addSwaggerPath(
	'/api/v2/inmuebles',
	'get',
	{
		summary: 'Obtiene todos los inmuebles',
		tags: ['Inmuebles'],
		responses: {
			200: {
				description: 'Lista todos los inmuebles',
				content: {
					'application/json': {
						schema: {
							$ref: '#/components/schemas/Book',
						},
					},
				},
			},
			400: {
				description: 'Error en la solicitud',
				content: {
					'application/json': {
						schema: {
							$ref: '#/components/schemas/Error',
						},
					},
				},
			},
			401: {
				description: 'No autorizado - Token invalido',
				content: {
					'application/json': {
						schema: {
							$ref: '#/components/schemas/Error',
						},
					},
				},
			},
		},
	},
	true
);
