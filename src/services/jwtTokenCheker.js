const fetch = require('node-fetch');

const checkJwt = async (req, res) => {
	try {
		const { authorization } = req.headers;

		const resp = await fetch(`https://auth.unstoppabledomains.com/userinfo`, {
			method: 'GET',
			headers: {
				Authorization: authorization,
			},
		});

		return resp;
	} catch (error) {
		console.error(error);
	}
};

module.exports = { checkJwt };
