const fetch = require('node-fetch');

const checkJwt = async (req, res) => {
	try {
		const { JWT } = req.headers;

		const resp = await fetch(`https://auth.unstoppabledomains.com/userinfo`, {
			method: 'GET',
			headers: {
				Authorization: JWT,
			},
		});

		const data = await resp.text();
		return resp;
	} catch (error) {
		console.error(error);
	}
};

module.exports = { checkJwt };
