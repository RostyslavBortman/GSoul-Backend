const { buildMessageMetamask } = require('./types.js');
const { signTypedData, SignTypedDataVersion } = require('@metamask/eth-sig-util');
const { chainId, verifierKey, verifierAddress } = require('../../config');

const prepareSignatureMetamask = (data) => {
	const message = {
		to: data.to,
		nonce: data.nonce,
		uri: data.uri,
		verifierAddress,
	};

	const params = buildMessageMetamask(message, chainId, data.verifyingContract);

	const callParams = {
		privateKey: Buffer.from(verifierKey, 'hex'),
		data: params,
		version: SignTypedDataVersion.V4,
	};
	return signTypedData(callParams);
};

module.exports = { prepareSignatureMetamask };
