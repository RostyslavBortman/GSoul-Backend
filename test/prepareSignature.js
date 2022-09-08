const { buildMessageMetamask, buildMessageTest, Message, SignerLike } = require('./types.ts');
const { signTypedData, SignTypedDataVersion } = require('@metamask/eth-sig-util');
const { verifyingContract, chainId } = require('../config');

export async function prepareSignatureMetamask(rawMessage, privateKey) {
	const key = privateKey.slice(2);
	const params = buildMessageMetamask(rawMessage, chainId, verifyingContract);
	const callParams = {
		privateKey: Buffer.from(key, 'hex'),
		data: params,
		version: SignTypedDataVersion.V4,
	};
	return signTypedData(callParams);
}
