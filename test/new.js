const ethers = require('ethers');
const { prepareSignatureMetamask } = require('./prepareSignature.js');

const mnemonic = 'exhaust short galaxy address hire cage picture water motion hold bid profit';

const wallet = new ethers.Wallet.fromMnemonic(mnemonic);

const nonce = 0;
const tokenId = 2;

// https://goerli.infura.io/v3/c9d2b1c02df346d2b84ca353cda7e69b