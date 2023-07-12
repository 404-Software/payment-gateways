import client from '../client'

export interface CreateTokenCardData {
	card: {
		number: number
		exp_month: number
		exp_year: number
		cvc: number
		name: string
		address?: {
			country?: string
			line1?: string
			city?: string
			street?: string
			avenue?: string
		}
	}
	client_ip: string
}

export interface CreateTokenCardResponse {
	id: string
	created: number
	object: 'token'
	live_mode: boolean
	type: 'CARD'
	used: boolean
	card: {
		id: string
		object: 'card'
		address: {
			country: string
			city: string
			avenue: string
			street: string
			line1: string
		}
		funding: 'DEBIT' | 'CREDIT' | 'PREPAID' | 'UNKNOWN'
		fingerprint: string
		brand: string
		scheme: string
		name: string
		issuer: {
			bank: string
			country: string
			id: string
		}
		exp_month: number
		exp_year: number
		last_four: string
		first_six: string
	}
}

const createTokenCard = async (
	data: CreateTokenCardData,
): Promise<CreateTokenCardResponse> => {
	const response = await client.post('tokens', data)
	return response.data
}

export interface CreateTokenSavedCardData {
	saved_card: {
		card_id: string
		customer_id: string
	}
}

export interface CreateTokenCardSavedResponse {
	id: string
	created: number
	object: 'token'
	live_mode: boolean
	type: 'CARD'
	used: boolean
	card: {
		id: string
		object: 'card'
		address: {
			country: string
			city: string
			avenue: string
			street: string
			line1: string
		}
		funding: 'DEBIT' | 'CREDIT' | 'PREPAID' | 'UNKNOWN'
		fingerprint: string
		brand: string
		scheme: string
		name: string
		issuer: {
			bank: string
			country: string
			id: string
		}
		exp_month: number
		exp_year: number
		last_four: string
		first_six: string
	}
}

const createTokenSavedCard = async (
	data: CreateTokenSavedCardData,
): Promise<CreateTokenCardSavedResponse> => {
	const response = await client.post('tokens', data)
	return response.data
}

export interface CreateTokenApplePayData {
	token_data: {
		data: string
	}
	client_ip: string
}

export interface CreateTokenApplePayResponse {
	id: string
	created: number
	object: 'token'
	live_mode: boolean
	type: 'CARD'
	used: boolean
	card: {
		id: string
		object: 'card'
		address: {
			country: string
			city: string
			avenue: string
			street: string
			line1: string
		}
		funding: 'DEBIT' | 'CREDIT' | 'PREPAID' | 'UNKNOWN'
		fingerprint: string
		brand: string
		scheme: string
		name: string
		issuer: {
			bank: string
			country: string
			id: string
		}
		exp_month: number
		exp_year: number
		last_four: string
		first_six: string
	}
}

const createTokenApplePay = async (
	data: CreateTokenApplePayData,
): Promise<CreateTokenApplePayResponse> => {
	const response = await client.post('tokens', {
		type: 'applepay',
		...data,
	})
	return response.data
}

export interface RetrieveTokenData {
	token_id: string
}

type RetrieveTokenResponse = {
	id: string
	object: string
	card: {
		id: string
		object: string
		address: object
		customer: string
		funding: string
		fingerprint: string
		brand: string
		exp_month: number
		exp_year: number
		last_four: string
		first_six: string
		name: string
	}
	client_ip: string
	created: number
	live_mode: boolean
	type: string
	used: boolean
}

const retrieveToken = async (
	data: RetrieveTokenData,
): Promise<RetrieveTokenResponse> => {
	const response = await client.get(`tokens/${data.token_id}`)
	return response.data
}

export default {
	create: {
		card: createTokenCard,
		savedCard: createTokenSavedCard,
		applePay: createTokenApplePay,
	},
	retrieve: retrieveToken,
}
