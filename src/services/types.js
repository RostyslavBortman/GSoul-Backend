const MintType = [
	{ name: 'verifier', type: 'address' },
	{ name: 'to', type: 'address' },
	{ name: 'nonce', type: 'uint256' },
];

const EIP712DomainType = [
	{ name: 'name', type: 'string' },
	{ name: 'version', type: 'string' },
	{ name: 'chainId', type: 'uint256' },
	{ name: 'verifyingContract', type: 'address' },
];


const buildMessageTest = (rawMessage, chainId, verifyingContract) => {
	const { verifierAddress, to, nonce } = rawMessage;
	return {
		domain: {
			chainId,
			name: 'Karma Token',
			verifyingContract,
			version: '1',
		},
		message: {
			verifier: verifierAddress,
			to,
			nonce,
		},
		primaryType: 'Mint',
		types: {
			Mint: MintType,
		},
	};
}

const buildMessageMetamask = (rawMessage, chainId, verifyingContract) => {
	const params = buildMessageTest(rawMessage, chainId, verifyingContract);
	return {
		...params,
		types: { ...params.types, EIP712Domain: EIP712DomainType },
	};
}

module.exports = { buildMessageMetamask };