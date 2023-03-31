import axios from 'axios'

interface CredimaxOrder {
	id: string | number
	total: string | number
}

interface CredimaxAddress {
	city: string
	street?: string
}

interface CredimaxConfig {
	merchantId?: string
	APIPassword?: string
	cancelUrl?: string
	returnUrl?: string
	shopName?: string
	testMode?: boolean
}

interface CredimaxSession {
	order: CredimaxOrder
	address: CredimaxAddress
	config?: CredimaxConfig
}

interface CredimaxResponse {
	successIndicator: string
	paymentUrl: string
	reference: string
}

export const CreateCredimaxSession = async ({
	order,
	address,
	config,
}: CredimaxSession): Promise<CredimaxResponse> => {
	const merchantId = config?.merchantId || process.env.CREDIMAX_MERCHANT_ID
	const apiPassword = config?.APIPassword || process.env.CREDIMAX_API_PASSWORD
	const cancelUrl = config?.cancelUrl || process.env.CREDIMAX_CANCEL_URL
	const returnUrl = config?.returnUrl || process.env.CREDIMAX_RETURN_URL
	const shopName = config?.shopName || process.env.CREDIMAX_SHOP_NAME
	const testMode = config?.testMode || process.env.CREDIMAX_TEST_MODE === 'true'

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
				reference: `${order.id}`,
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
		reference: data.successIndicator,
	}
}
