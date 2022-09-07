const Kyc = require('../models/kyc');

const {
	isEmail,
	oneLowercaseChar,
	oneUppercaseChar,
	oneNumber,
	oneSpecialChar,
	isMasternodeAddress,
} = require('../middlewares/cusotomValidator.js');

const {
	ERROR_LOGIN_PASSWORD_INVALID,
	ERROR_USER_NOT_VERIFICATION,
	ERROR_EMAIL_TAKEN,
	ERROR_LOGIN_TAKEN,
	ERROR_NO_USER,
	ERROR_TOKEN_INVALID,
	ERROR_OLD_PASSWORD_INVALID,
	ERROR_PASSWORD_NOT_MATCH,
	ERROR_USER_ALREADY_VERIFIED,
	ERROR_WRONG_PASSWORD,
	ERROR_ADDRESS_TAKEN,
	ERROR_WRONG_EMAIL,
	ERROR_WRONG_MASTERNODE_ADDRESS,
} = require('../const/const.js');

// @route POST api/kyc/addUser
// @desc Add User
// @access Public

exports.addUser = async (req, res) => {
	try {
		const { email, name, lastName, birthday, sex, kyc, address } = req.body;

		// if (isEmail(email)) return res.status(500).json({ message: ERROR_WRONG_EMAIL });

		let userByAddress = await Kyc.findOne({ address });

		if (userByAddress) return res.status(400).json({ message: ERROR_ADDRESS_TAKEN });

		const newKyc = new Kyc({ ...req.body, role: 'basic' });
		await newKyc.save();

		const user = await Kyc.findOne({ email });
		res.status(200).json(user);
	} catch (error) {
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
