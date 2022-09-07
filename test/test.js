let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = chai.expect;
let should = chai.should();
var path = require('path');
const {
	ERROR_NO_USER,
	ERROR_TOKEN_LIFETIME_IS_OVER,
	ERROR_USER_NOT_VERIFICATION,
	ERROR_USER_ALREADY_VERIFIED,
	PASSWORD_SUCCESSFULLY_CHANGED,
	WATCHLIST_ADDRESS_ALREADY_EXIST,
	INVALID_NOTIFICATION_STATUS,
	OFF,
	ALL,
	ONLY_INCOMING,
	ERROR_WRONG_ADDRESS,
	ONLY_OUTGOING,
	WATCHLIST_ADDRESS_NOT_PROVIDED,
	WATCHLIST_ADDRESS_NOT_FOUND,
	TX_HASH_ALREADY_EXIST,
	TX_HASH_NOT_PROVIDED,
	TX_HASH_NOT_FOUND,
	ERROR_WRONG_TX_HASH,
} = require('../src/const/const.js');

chai.use(chaiHttp);
const server = `http://localhost`;
const port = +process.env.PORT || 7515;
const url = `${server}:${port}`;

let randString = () => {
	return `${Math.random()
		.toString(36)
		.replace(/[^a-z]+/g, '')}${Math.random()
		.toString(36)
		.replace(/[^a-z]+/g, '')}`;
};
let randPassWithProperties = () => {
	return `${randString()}F12)`;
};
let randEmail = () => {
	return `${randString()}@gmail.com`;
};
const email = randEmail();
const password = randPassWithProperties();
const address = randString();
const login = randString();
const address1 = '0x3A0060f7e429e6a8c217B8229d232E8Da506aa5434d';

const wrongAddress = 'mhwjbp5bgKLub6vwEVNewePqaT25DzGzxfd';


// NOT working now

describe('should add a new user', function () {
	this.timeout(13000);

	it('add user', (done) => {
		let body = {
			email,
			address
		};
		
		chai.request(url)
			.post('/api/kyc/addUser')
			.type('form')
			.send(body)
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.be.a('object');

				done();
			});
	});

});

describe('get user by address from DB', () => {
	it('it should GET user', (done) => {
		chai.request(url)
			.get(`/api/kyc/getUserByAddress/${address1}`)
			.end((err, res) => {
				res.should.have.status(200);
				done();
			});
	});
});
