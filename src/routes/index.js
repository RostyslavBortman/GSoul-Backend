const kyc = require('./kyc');

module.exports = (app) => {
	app.use('/api/kyc', kyc);
};
