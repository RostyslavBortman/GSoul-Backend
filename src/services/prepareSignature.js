const { buildMessageMetamask } = require('./types.js');
const { signTypedData, SignTypedDataVersion } = require('@metamask/eth-sig-util');
const { verifyingContract, chainId, verifierKey, verifierAddress } = require('../../config');

const prepareSignatureMetamask = (rawMessage) => {
	const message = { ...rawMessage, verifierAddress };
	const params = buildMessageMetamask(message, chainId, verifyingContract);

	const callParams = {
		privateKey: Buffer.from(verifierKey, 'hex'),
		data: params,
		version: SignTypedDataVersion.V4,
	};
	return signTypedData(callParams);
};

module.exports = { prepareSignatureMetamask };
