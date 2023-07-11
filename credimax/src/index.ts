import axios from 'axios'

interface CredimaxOrder {
	id: string | number
	total: string | number
	currency?: 'BHD' | 'USD'
	description?: string
}

interface CredimaxAddress {
	country: 'BHR' | 'USA' | 'SAU' | 'ARE' | 'KWT' | 'OMN' | 'QAT'
	city: string
	street?: string
}

interface CredimaxConfig {
	credentials?: {
		id?: string
		password?: string
	}
	urls?: {
		returnUrl?: string
		cancelUrl?: string
	}
	information?: {
		name?: string
		logo?: string
	}
}

interface CredimaxSession {
	order: CredimaxOrder
	address?: CredimaxAddress
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
	const id = config?.credentials?.id || process.env.CREDIMAX_MERCHANT_ID
	const password =
		config?.credentials?.password || process.env.CREDIMAX_API_PASSWORD
	const cancelUrl = config?.urls?.cancelUrl || process.env.CREDIMAX_CANCEL_URL
	const returnUrl = config?.urls?.returnUrl || process.env.CREDIMAX_RETURN_URL
	const shopName = config?.information?.name || process.env.CREDIMAX_SHOP_NAME
	const logo = config?.information?.logo || process.env.CREDIMAX_LOGO

	if (!id || !password || !cancelUrl || !returnUrl)
		throw new Error(
			'The CREDIMAX_SHOP_NAME, CREDIMAX_RETURN_URL, CREDIMAX_CANCEL_URL, CREDIMAX_MERCHANT_ID and CREDIMAX_API_PASSWORD environment variables must be set OR provide a config to the function',
		)

	const { data } = await axios({
		method: 'POST',
		url: `https://credimax.gateway.mastercard.com/api/rest/version/70/merchant/${id}/session`,
		auth: { username: `merchant.${id}`, password },
		data: {
			apiOperation: 'INITIATE_CHECKOUT',
			interaction: {
				operation: 'PURCHASE',
				action: { '3DSecure': 'MANDATORY' },
				cancelUrl,
				returnUrl,
				locale: 'en',
				displayControl: {
					billingAddress: 'HIDE',
					cardSecurityCode: 'MANDATORY',
					confirmAchAccountNumber: 'SHOW',
					customerEmail: 'HIDE',
					paymentTerms: 'SHOW_IF_SUPPORTED',
					shipping: 'HIDE',
				},
				merchant: { name: shopName, logo },
			},
			billing: {
				address: {
					country: address?.country,
					city: address?.city,
					street: address?.street,
				},
			},
			order: {
				id: `${order.id}-${Math.round(new Date().getTime() / 1000)}`,
				invoiceNumber: `${order.id}`,
				reference: `${order.id}`,
				currency: order.currency || 'BHD',
				amount: `${order.total}`,
				description: order.description,
			},
			transaction: { source: 'INTERNET' },
		},
	})

	return {
		successIndicator: data.successIndicator,
		paymentUrl: `https://credimax.gateway.mastercard.com/checkout/entry/${data.session.id}?checkoutVersion=1.0.0`,
		reference: data.successIndicator,
	}
}
