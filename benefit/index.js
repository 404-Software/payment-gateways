const { encrypt } = require('./Encryption')

module.exports = async ({ config, order }) => {
	const transportalId =
		process.env.BENEFIT_TRANSPORTAL_ID || config.transportalId
	const transportalPassword =
		process.env.BENEFIT_TRANSPORTAL_PASSWORD || config.transportalPassword
	const terminalResourcekey =
		process.env.BENEFIT_TERMINAL_RESOURCE_KEY || config.terminalResourcekey
	const iv = process.env.BENEFIT_IV || config.iv
	const cancelUrl = process.env.BENEFIT_CANCEL_URL || config.cancelUrl
	const returnUrl = process.env.BENEFIT_RETURN_URL || config.returnUrl
	const testMode = process.env.BENEFIT_TEST_MODE || config.testMode || false

	if (
		!transportalId ||
		!transportalPassword ||
		!terminalResourcekey ||
		!iv ||
		!cancelUrl ||
		!returnUrl
	)
		throw new Error(
			'The BENEFIT_TRANSPORTAL_ID, BENEFIT_TRANSPORTAL_PASSWORD, BENEFIT_TERMINAL_RESOURCE_KEY, BENEFIT_IV, BENEFIT_CANCEL_URL and BENEFIT_RETURN_URL environment variables must be set OR provide a config to the function',
		)

	const ReqAction = `action=1&`
	const ReqAmount = `amt=${order.toal}&`
	const ReqTrackId = `trackid=${order.id}-${Math.round(
		new Date().getTime() / 1000,
	)}&`
	const ReqTranportalId = `id=${transportalId}&`
	const ReqTranportalPassword = `password=${transportalPassword}&`
	const ReqCurrency = `currencycode=048&`
	const ReqResponseUrl = `responseURL=${returnUrl}&`
	const ReqErrorUrl = `errorURL=${cancelUrl}&`

	const TranRequest =
		ReqAmount +
		ReqAction +
		ReqResponseUrl +
		ReqErrorUrl +
		ReqTrackId +
		ReqCurrency +
		ReqTranportalId +
		ReqTranportalPassword

	const trandata = encrypt(TranRequest, terminalResourcekey, iv)

	return `https://www.${
		testMode ? 'test.' : ''
	}benefit-gateway.bh/payment/PaymentHTTP.htm?param=paymentInit&trandata=${trandata}&${ReqResponseUrl}${ReqErrorUrl}tranportalId=${transportalId}`
}
