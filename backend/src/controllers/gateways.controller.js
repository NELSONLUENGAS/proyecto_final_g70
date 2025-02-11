require('dotenv');

const { STRIPE_SECRET_KEY } = process.env;

const stripe = require('stripe')(String(STRIPE_SECRET_KEY));

const handleCreateCheckoutSession = async (req, res, next) => {
	try {
		const { cart } = req.body;

		const line_items = cart.map((cartItem) => {
			return {
				price_data: {
					currency: 'usd',
					unit_amount: Math.round(cartItem.price * 100),
					product_data: {
						name: cartItem.name,
						images: [cartItem.image],
					},
				},
				quantity: cartItem.quantity,
			};
		});

		const session = await stripe.checkout.sessions.create({
			line_items,
			mode: 'payment',
			success_url: `http://localhost:3000/api/v2/gateways/success?success=true`,
			cancel_url: `http://localhost:3000/api/v2/gateways/cancelled?canceled=true`,
		});

		res.status(200).json({ url: session.url });
	} catch (error) {
		next(error);
	}
};

module.exports = {
	handleCreateCheckoutSession,
};
