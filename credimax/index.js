const axios = require('axios')

module.exports = async ({ order, address, config }) => {
	const merchantId = process.env.CREDIMAX_MERCHANT_ID || config?.merchantId
	const apiPassword = process.env.CREDIMAX_API_PASSWORD || config?.APIPassword
	const cancelUrl = process.env.CREDIMAX_CANCEL_URL || config?.cancelUrl
	const returnUrl = process.env.CREDIMAX_RETURN_URL || config?.returnUrl
	const shopName = process.env.CREDIMAX_SHOP_NAME || config?.shopName
	const testMode = process.env.CREDIMAX_TEST_MODE === 'true' || config?.testMode

	if (!merchantId || !apiPassword || !cancelUrl || !returnUrl || !shopName)
		throw new Error(
			'The CREDIMAX_SHOP_NAME, CREDIMAX_RETURN_URL, CREDIMAX_CANCEL_URL, CREDIMAX_MERCHANT_ID and CREDIMAX_API_PASSWORD environment variables must be set OR provide a config to the function',
		)

	const { data } = await axios({
		method: 'POST',
		url: `https://credimax.gateway.mastercard.com/api/rest/version/64/merchant/${merchantId}/session`,
		auth: { username: `merchant.${merchantId}`, password: apiPassword },
		data: {
			apiOperation: 'INITIATE_CHECKOUT',
			interaction: {
				operation: testMode ? 'AUTHORIZE' : 'PURCHASE',
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
				id: `${order.id}-${Math.round(new Date().getTime() / 1000)}`,
				invoiceNumber: `${order.id}`,
				currency: 'BHD',
				amount: `${order.total}`,
				description: `Order Ref: ${order.id}`,
			},
			transaction: { source: 'INTERNET' },
		},
	})

	return {
		successIndicator: data.successIndicator,
		paymentUrl: `https://credimax.gateway.mastercard.com/checkout/entry/${data.session.id}`,
	}
}
