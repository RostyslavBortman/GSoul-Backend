const MintType = [
	{ name: 'verifier', type: 'address' },
	{ name: 'to', type: 'address' },
	{ name: 'tokenId', type: 'uint256' },
	{ name: 'nonce', type: 'uint256' },
];

const EIP712DomainType = [
	{ name: 'name', type: 'string' },
	{ name: 'version', type: 'string' },
	{ name: 'chainId', type: 'uint256' },
	{ name: 'verifyingContract', type: 'address' },
];


export function buildMessageTest(rawMessage, chainId, verifyingContract) {
	const { verifier, to, tokenId, nonce } = rawMessage;
	return {
		domain: {
			chainId,
			name: 'Karma Token',
			verifyingContract,
			version: '1',
		},
		message: {
			verifier,
			to,
			tokenId,
			nonce,
		},
		primaryType: 'Mint',
		types: {
			Mint: MintType,
		},
	};
}

export function buildMessageMetamask(rawMessage, chainId, verifyingContract) {
	const params = buildMessageTest(rawMessage, chainId, verifyingContract);
	return {
		...params,
		types: { ...params.types, EIP712Domain: EIP712DomainType },
	};
}
