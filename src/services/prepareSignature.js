const { buildMessageMetamask } = require('./types.js');
const { signTypedData, SignTypedDataVersion } = require('@metamask/eth-sig-util');
const { verifyingContract, chainId, key } = require('../../config');

const prepareSignatureMetamask = (rawMessage) => {
	const params = buildMessageMetamask(rawMessage, chainId, verifyingContract);
	const callParams = {
		privateKey: Buffer.from(key, 'hex'),
		data: params,
		version: SignTypedDataVersion.V4,
	};
	return signTypedData(callParams);
}

module.exports = { prepareSignatureMetamask };