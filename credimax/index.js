const axios = require('axios')

module.exports = async ({ order, address, config }) => {
	const merchantId = process.env.CREDIMAX_MERCHANT_ID || config.merchantId
	const apiPassword = process.env.CREDIMAX_API_PASSWORD || config.APIPassword
	const cancelUrl = process.env.CREDIMAX_CANCEL_URL || config.cancelUrl
	const returnUrl = process.env.CREDIMAX_RETURN_URL || config.returnUrl
	const shopName = process.env.CREDIMAX_SHOP_NAME || config.shopName
	const testMode = process.env.CREDIMAX_TEST_MODE || config.testMode

	if (!merchantId && !apiPassword && !cancelUrl && !returnUrl && !shopName)
		throw new Error(
			'The CREDIMAX_SHOP_NAME, CREDIMAX_RETURN_URL, CREDIMAX_CANCEL_URL, CREDIMAX_MERCHANT_ID and CREDIMAX_API_PASSWORD environment variables must be set OR provide a config to the function',
		)

	let sessionId = ''
	await axios({
		method: 'POST',
		url: `https://credimax.gateway.mastercard.com/api/rest/version/64/merchant/${merchantId}/session`,
		auth: { username: `merchant.${merchantId}`, password: apiPassword },
		data: {
			apiOperation: 'INITIATE_CHECKOUT',
			interaction: {
				operation: testMode ? 'AUTHORIZE' : 'PAY',
				action: { '3DSecure': 'MANDATORY' },
				cancelUrl,
				returnUrl,
				locale: 'en',
				style: { theme: 'default' },
				displayControl: {
					billingAddress: 'HIDE',
					cardSecurityCode: 'MANDATORY',
					confirmAchAccountNumber: 'SHOW',
					customerEmail: 'HIDE',
					paymentTerms: 'SHOW_IF_SUPPORTED',
					shipping: 'HIDE',
				},
				merchant: { name: shopName },
			},
			billing: {
				address: {
					country: 'BHR',
					city: address.city,
					street: address.street,
				},
			},
			order: {
				id: `${order.id}`,
				invoiceNumber: `${order.id}`,
				currency: 'BHD',
				amount: `${order.total}`,
				description: `Order Ref: ${order.id}`,
			},
			transaction: { source: 'INTERNET' },
		},
	})
		.then(({ data }) => (sessionId = data.session.id))
		// eslint-disable-next-line no-console
		.catch(e => console.error(e))

	return `https://credimax.gateway.mastercard.com/checkout/entry/${sessionId}`
}
