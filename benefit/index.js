const { encrypt, decrypt } = require('./Encryption')
const axios = require('axios')

const CreateBenefitSession = async ({ config, order }) => {
	const transportalId =
		process.env.BENEFIT_TRANSPORTAL_ID || config.transportalId
	const transportalPassword =
		process.env.BENEFIT_TRANSPORTAL_PASSWORD || config.transportalPassword
	const terminalResourcekey =
		process.env.BENEFIT_TERMINAL_RESOURCE_KEY || config.terminalResourcekey
	const cancelUrl = process.env.BENEFIT_CANCEL_URL || config.cancelUrl
	const returnUrl = process.env.BENEFIT_RETURN_URL || config.returnUrl
	const testMode = process.env.BENEFIT_TEST_MODE || config.testMode || false

	if (
		!transportalId ||
		!transportalPassword ||
		!terminalResourcekey ||
		!cancelUrl ||
		!returnUrl
	)
		throw new Error(
			'The BENEFIT_TRANSPORTAL_ID, BENEFIT_TRANSPORTAL_PASSWORD, BENEFIT_TERMINAL_RESOURCE_KEY, BENEFIT_IV, BENEFIT_CANCEL_URL and BENEFIT_RETURN_URL environment variables must be set OR provide a config to the function',
		)

	const data = [
		{
			action: '1',
			currencycode: '048',
			cardType: 'D',
			amt: order.total,
			password: transportalPassword,
			id: transportalId,
			resourceKey: terminalResourcekey,
			trackid: `${order.id}-${Math.round(new Date().getTime() / 1000)}`,
			responseURL: returnUrl,
			errorURL: cancelUrl,
		},
	]

	const trandata = encrypt({
		trandata: JSON.stringify(data),
	}).toUpperCase()

	const res = await axios.post(
		`https://www.${
			testMode ? 'test.' : ''
		}benefit-gateway.bh/payment/API/hosted.htm`,
		[{ trandata, id: transportalId }],
		{
			header: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				charset: 'utf8',
			},
		},
	)

	return res.data[0].result
}

module.exports = { CreateBenefitSession, DecryptBenefitTrandata: decrypt }
