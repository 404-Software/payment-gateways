const crypto = require('crypto')

const algorithm = 'aes-256-cbc'
const messageEncoding = 'utf8'
const cipherEncoding = 'base64'

const AesEncryption = (message, key, iv) => {
	const cipher = crypto.createCipheriv(algorithm, key, iv)
	cipher.setAutoPadding(true)

	return (
		cipher.update(message, messageEncoding, cipherEncoding) +
		cipher.final(cipherEncoding)
	)
}

// const AesDecryption = (message, key, iv) => {
// 	const decipher = crypto.createDecipheriv(algorithm, key, iv)
// 	decipher.setAutoPadding(true)

// 	return (
// 		decipher.update(message, cipherEncoding, messageEncoding) +
// 		decipher.final(messageEncoding)
// 	)
// }

const toHexString = byteArray => {
	return byteArray.toString('hex')
}

const base64Decode = str => {
	return Buffer.from(str, 'base64')
}

const encrypt = (message, key, iv) => {
	let encrypted = AesEncryption(message, key, iv)
	encrypted = base64Decode(encrypted)
	encrypted = toHexString(encrypted)

	return encrypted
}

// const decrypt = (message, key, iv) => {
// 	const decrypted = AesDecryption(message, key, iv)

// 	return decrypted
// }

module.exports = { encrypt }
