const aesjs = require('aes-js')

const BENEFIT_IV = process.env.BENEFIT_IV
const BENEFIT_TERMINAL_RESOURCE_KEY = process.env.BENEFIT_TERMINAL_RESOURCE_KEY

function encrypt(data) {
	const iv = BENEFIT_IV || data.iv
	const key = BENEFIT_TERMINAL_RESOURCE_KEY || data.key

	if (!iv || !key)
		throw new Error(
			'The BENEFIT_IV & BENEFIT_TERMINAL_RESOURCE_KEY environment variables must be set OR provide a config to the function',
		)

	const rkEncryptionIv = aesjs.utils.utf8.toBytes(iv)
	const enckey = aesjs.utils.utf8.toBytes(key)
	const aesCtr = new aesjs.ModeOfOperation.cbc(enckey, rkEncryptionIv)
	const textBytes = aesjs.utils.utf8.toBytes(data.trandata)
	const encryptedBytes = aesCtr.encrypt(aesjs.padding.pkcs7.pad(textBytes))
	const encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes)
	return encryptedHex
}

function decrypt(data) {
	const iv = BENEFIT_IV || data.iv
	const key = BENEFIT_TERMINAL_RESOURCE_KEY || data.key

	if (!iv || !key)
		throw new Error(
			'The BENEFIT_IV & BENEFIT_TERMINAL_RESOURCE_KEY environment variables must be set OR provide a config to the function',
		)

	const invalidValuesFilter = val => {
		const invalidValues = [7]

		return !invalidValues.includes(val)
	}

	const encryptedHex = data.buffer.toString()
	const enckey = aesjs.utils.utf8.toBytes(key)
	const rkEncryptionIv = aesjs.utils.utf8.toBytes(iv)
	const encryptedBytes = aesjs.utils.hex.toBytes(encryptedHex)
	const aesCbc = new aesjs.ModeOfOperation.cbc(enckey, rkEncryptionIv)
	const decryptedBytes = aesCbc
		.decrypt(encryptedBytes)
		.filter(invalidValuesFilter)
	const decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes)
	const [result] = JSON.parse(decodeURIComponent(decryptedText))

	const id = result.trackId.split('-')[0]

	return { id, ...result }
}

module.exports = { encrypt, decrypt }
