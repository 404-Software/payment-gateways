import axios from 'axios'

type Address = {
	street: string
	city: string
}

type Config = {
	merchantId: string
	APIPassword: string
	cancelUrl: string
	returnUrl: string
	shopName: string
}

type CrediMaxSession = {
	orderId: string | number
	totalAmount: string | number
	address: Address
	config?: Config
}

export const CreateCrediMaxSession = async ({
	orderId,
	totalAmount,
	address,
	config,
}: CrediMaxSession) => {
	const CREDIMAX_MERCHANT_ID = process.env.CREDIMAX_MERCHANT_ID
	const CREDIMAX_API_PASSWORD = process.env.CREDIMAX_API_PASSWORD
	const CREDIMAX_RETURN_URL = process.env.CREDIMAX_RETURN_URL
	const CREDIMAX_CANCEL_URL = process.env.CREDIMAX_CANCEL_URL
	const CREDIMAX_SHOP_NAME = process.env.CREDIMAX_SHOP_NAME

	if (
		(!CREDIMAX_MERCHANT_ID && !config.merchantId) ||
		(!CREDIMAX_API_PASSWORD && !config.APIPassword) ||
		(!CREDIMAX_RETURN_URL && !config.returnUrl) ||
		(!CREDIMAX_CANCEL_URL && !config.cancelUrl) ||
		(!CREDIMAX_SHOP_NAME && !config.shopName)
	)
		throw new Error(
			'The CREDIMAX_SHOP_NAME, CREDIMAX_RETURN_URL, CREDIMAX_CANCEL_URL, CREDIMAX_MERCHANT_ID and CREDIMAX_API_PASSWORD environment variables must be set OR provide a config to the function',
		)

	let sessionId = ''
	await axios({
		method: 'POST',
		url: `https://credimax.gateway.mastercard.com/api/rest/version/63/merchant/${
			CREDIMAX_MERCHANT_ID || config.merchantId
		}/session`,
		auth: {
			username: `merchant.${CREDIMAX_MERCHANT_ID || config.merchantId}`,
			password: CREDIMAX_API_PASSWORD || config.APIPassword,
		},
		data: {
			apiOperation: 'INITIATE_CHECKOUT',
			interaction: {
				operation: 'AUTHORIZE',
				action: { '3DSecure': 'MANDATORY' },
				cancelUrl: CREDIMAX_CANCEL_URL || config.cancelUrl,
				returnUrl: CREDIMAX_RETURN_URL || config.returnUrl,
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
				merchant: { name: CREDIMAX_SHOP_NAME || config.shopName },
			},
			billing: {
				address: {
					street: address.street,
					city: address.city,
					country: 'BHR',
				},
			},
			order: {
				id: `${orderId}`,
				invoiceNumber: `${orderId}`,
				currency: 'BHD',
				amount: `${totalAmount}`,
				description: `Order Ref: ${orderId}`,
			},
			transaction: { source: 'INTERNET' },
		},
	})
		.then(({ data }) => (sessionId = data.session.id))
		// eslint-disable-next-line no-console
		.catch(e => console.error(e))

	return `https://credimax.gateway.mastercard.com/checkout/entry/${sessionId}`
}
