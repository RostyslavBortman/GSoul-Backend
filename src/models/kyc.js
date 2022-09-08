const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
	// Name: string,
	// LastName: string,
	// birthday: timestamp,
	// email: String,
	// sex: string,
	// KYC: bool,
	// address: string

	{
		name: {
			type: String,
			required: true,
			default: '',
			max: 100,
		},

		lastName: {
			type: String,
			required: false,
			default: '',
			max: 100,
		},

		birthday: {
			type: String,
			required: false,
			default: Date.now(),
			max: 100,
		},

		sex: {
			type: String,
			required: false,
			default: 'male',
			max: 100,
		},

		email: {
			type: String,
			unique: false,
			required: false,
			trim: true,
		},

		kyc: {
			type: Boolean,
			default: true,
		},

		address: {
			type: String,
			required: false,
			unique: true,
			default: '0x0000000000000000000000000000000000000000',
			max: 100,
		},
	}
);

module.exports = mongoose.model('UserData', UserSchema);
