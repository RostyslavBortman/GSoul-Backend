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

		const data = await resp.text();
		console.log(`1----=-----=----=----=----=----=----- resp -----=-----=-----=-----=-- 1`);
		console.log(resp);
		console.log(`2----=-----=----=----=----=----=----- resp -----=-----=-----=-----=-- 2`);

		return resp;
	} catch (error) {
		console.error(error);
	}
};

module.exports = { checkJwt };
