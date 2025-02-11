const schemas = {
	User: {
		type: 'object',
		properties: {
			id: {
				type: 'integer',
				example: 23,
			},
			email: {
				type: 'string',
				example: 'Test@example.com',
			},
			email_verified: {
				type: 'boolean',
				example: false,
			},
			role: {
				type: 'string',
				example: 'ADMIN',
			},
		},
	},
	Book: {
		type: 'object',
		properties: {
			id: {
				type: 'integer',
				example: 30,
			},
			title: {
				type: 'string',
				example: 'Cien años de soledad',
			},
			book_description: {
				type: 'string',
				example: 'Cien años de más soledad',
			},
			author: {
				type: 'string',
				example: 'GABO',
			},
		},
	},
	Error: {
		type: 'object',
		properties: {
			id: {
				type: 'string',
				example: 'badRequest',
			},
			message: {
				type: 'string',
				example: 'Error en los datos de los inputs',
			},
			description: {
				type: 'string',
				example: 'Algunos datos faltan o están erroneos',
			},
			code: {
				type: 'integer',
				example: 500,
			},
		},
	},
};

module.exports = schemas;
