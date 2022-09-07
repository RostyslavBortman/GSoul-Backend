const isEmail = (value) => !/[a-z0-9.]+@[a-z]+\.[a-z]+/.test(value.toLowerCase().trim());
const oneLowercaseChar = (value) => !/^(?=.*[a-z])/.test(value);
const oneUppercaseChar = (value) => !/^(?=.*[A-Z])/.test(value);
const oneNumber = (value) => !/^(?=.*[0-9])/.test(value);
const oneSpecialChar = (value) => !/^(?=.*\W)/.test(value);
const notEmpty = (value) => value.length === 0;
const isMasternodeAddress = (value) => !/^(^(bc1|[13|]|m)[a-zA-HJ-NP-Z0-9]{25,39}$)/.test(value);
const isTxHash = (value) => !/^([a-fA-F0-9]{64}$)/.test(value);

module.exports = { isEmail, oneLowercaseChar, oneUppercaseChar, oneNumber, oneSpecialChar, notEmpty, isMasternodeAddress, isTxHash };
