const { buildMessageMetamask, buildMessageTest, Message, SignerLike } = require('./types.ts');
const { signTypedData, SignTypedDataVersion } = require('@metamask/eth-sig-util');

export async function prepareSignatureMetamask(rawMessage, signer, verifyingContract) {
	const chainId = await signer.getChainId();
	const params = buildMessageMetamask(rawMessage, chainId, verifyingContract);
	const callParams = {
		privateKey: Buffer.from(signer.privateKey),
		data: params,
		version: SignTypedDataVersion.V4,
	};
	return signTypedData(callParams);
}
