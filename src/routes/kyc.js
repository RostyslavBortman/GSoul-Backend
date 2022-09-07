const express = require('express');

const Kyc = require('../controllers/kyc');

const router = express.Router();

router.get('/', (req, res) => {
	res.status(200).json({
		message: 'You are in the KYC Endpoints. Add here the KYC data ',
	});
});

router.post('/addUser', Kyc.addUser);
router.get('/getUserByAddress/:address', Kyc.getUserByAddress);
// router.put('/updateUser', Kyc.updateUser);
// router.delete('/deleteUser', Kyc.deleteuser);

module.exports = router;
