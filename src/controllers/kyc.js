const Kyc = require('../models/kyc');
const { checkJwt } = require('../services/jwtTokenCheker');
const { prepareSignatureMetamask } = require('../services/prepareSignature');

const {
	ERROR_NO_USER,
	ERROR_ADDRESS_TAKEN,
	ERROR_WRONG_EMAIL,
	WRONG_JWT,
	ERROR_WHILE_CHEKING_JWT,
	MISSING_AUTHORRIZATION_HEADER,
	WRONG_AUTHORIZATION_TOKEN,
} = require('../const/const.js');

// @route POST api/kyc/addUser
// @desc Add User
// @access Public

exports.addUser = async (req, res) => {
	try {
		if (!req.headers.authorization) return res.status(401).json({ message: MISSING_AUTHORRIZATION_HEADER });

		const jwtResult = await checkJwt(req);
		if (jwtResult.status === 401) return res.status(401).json({ message: WRONG_JWT });
		if (jwtResult.status !== 200) return res.status(401).json({ message: ERROR_WHILE_CHEKING_JWT });

		const { email, name, lastName, birthday, sex, address } = req.body;

		let userByAddress = await Kyc.findOne({ address });

		if (userByAddress) return res.status(400).json({ message: ERROR_ADDRESS_TAKEN });

		const newKyc = new Kyc({ ...req.body, role: 'basic' });
		await newKyc.save();

		const user = await Kyc.findOne({ email });

		res.status(200).json(user);
		// res.status(200).json(user, 'bad JWT token');
	} catch (error) {
		console.log(error);
		res.status(500).json({ success: false, message: error.message });
	}
};

// @route GET api/kyc/email:email
// @desc get user data
// @access Public

exports.getUserByAddress = async (req, res) => {
	try {
		const { address } = req.params;

		const user = await Kyc.findOne({ address });
		if (!user) return res.status(400).json({ message: ERROR_NO_USER });

		res.status(200).send(user);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

exports.generateSignature = async (req, res) => {
	try {
		// authToken = process.env.AUTHORIZATION_TOKEN
		// if (!req.headers.authorization) return res.status(401).json({ message: MISSING_AUTHORRIZATION_HEADER });
		// if (req.headers.authorization !== authToken) return res.status(401).json({ message: WRONG_AUTHORIZATION_TOKEN });

		// const jwtResult = await checkJwt(req);
		// if (jwtResult.status === 401) return res.status(401).json({ message: WRONG_JWT });
		// if (jwtResult.status !== 200) return res.status(401).json({ message: ERROR_WHILE_CHEKING_JWT });

		const { to, nonce, uri, verifyingContract } = req.body;

		const signature = prepareSignatureMetamask({ to, nonce, uri, verifyingContract });
		res.status(200).json({ signature });
	} catch (error) {
		console.log(error);
		res.status(500).json({ success: false, message: error.message });
	}
};
