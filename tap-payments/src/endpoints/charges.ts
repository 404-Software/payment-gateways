import client from '../client'

export interface CreateChargeData {
	amount: number
	currency: 'BHD' | 'KWD' | 'SAR' | 'EGP'
	customer_initiated?: boolean
	threeDSecure?: boolean
	save_card?: boolean
	payment_agreement?: {
		id: string
		contract: {
			id: string
		}
	}
	description?: string
	order?: {
		id: string
	}
	metadata?: {
		udf1?: string
	}
	reference?: {
		transaction?: string
		order?: string
	}
	receipt?: {
		email?: boolean
		sms?: boolean
	}
	customer: {
		first_name: string
		middle_name?: string
		last_name?: string
		email: string
		phone?: {
			country_code?: number
			number?: number
		}
		id?: string
	}
	merchant?: {
		id: number
	}
	source: {
		id:
			| 'src_all'
			| 'src_card'
			| 'src_sa.mada'
			| 'src_kw.knet'
			| 'src_bh.benefit'
			| 'src_om.omannet'
			| 'src_eg.fawry'
			| 'src_apple_pay'
	}
	post?: {
		url?: string
	}
	redirect: {
		url: string
	}
}

export interface CreateChargeResponse {
	id: string
	object: string
	live_mode: boolean
	api_version: string
	method: string
	status: string
	amount: number
	currency: string
	threeDSecure: boolean
	card_threeDSecure: boolean
	save_card: boolean
	merchant_id: string
	product: string
	description: string
	metadata?: {
		udf1?: string
	}
	transaction: {
		timezone: string
		created: string
		url: string
		expiry: {
			asynchronous: boolean
			amount: number
			currency: string
		}
		reference: {
			transaction: string
			order: string
		}
	}
	response: {
		code: string
		message: string
	}
	receipt: {
		email: boolean
		sms: boolean
	}
	customer: {
		first_name: string
		last_name: string
		email: string
		phone?: {
			country_code: string
			number: string
		}
	}
	merchant: {
		id: string
	}
	source: {
		id: string
	}
	redirect: {
		status: string
		url: string
	}
	post?: {
		status: string
		url: string
	}
	activities?: Array<{
		id: string
		object: string
		created: number
		status: string
		currency: string
		amount: number
		remarks: string
		auto_reversed: boolean
	}>
}

const createCharge = async (
	data: CreateChargeData,
): Promise<CreateChargeResponse> => {
	const response = await client.post('/charges', data)
	return response.data
}

export interface RetrieveChargeData {
	charge_id: string
}

export interface RetrieveChargeResponse {
	id: string
	object: string
	live_mode: boolean
	api_version: string
	method: string
	status: string
	amount: number
	currency: string
	threeDSecure: boolean
	card_threeDSecure: boolean
	save_card: boolean
	merchant_id: string
	product: string
	description: string
	metadata?: {
		udf1?: string
	}
	transaction: {
		authorization_id: string
		timezone: string
		created: string
		expiry: {
			period: number
			type: string
			asynchronous: boolean
			amount: number
			currency: string
			reference: {
				track: string
				payment: string
				gateway: string
				acquirer: string
				transaction: string
				order: string
			}
		}
		response: {
			code: string
			message: string
			acquirer?: {
				response: {
					code: string
					message: string
				}
			}
			gateway?: {
				response: {
					code: string
					message: string
				}
			}
		}
		card: {
			object: string
			first_six: string
			scheme: string
			brand: string
			type: string
			category: string
			last_four: string
		}
		receipt: {
			id: string
			email: boolean
			sms: boolean
		}
		customer: {
			id: string
			first_name: string
			last_name: string
			email: string
			phone?: {
				country_code: string
				number: string
			}
		}
		merchant: {
			country: string
			currency: string
			id: string
		}
		source: {
			object: string
			type: string
			payment_type: string
			payment_method: string
			channel: string
			id: string
		}
		redirect?: {
			status: string
			url: string
		}
		post?: {
			status: string
			url: string
		}
		issuer?: {
			id: string
			name: string
			country: string
			region: string
		}
		activities?: Array<{
			id: string
			object: string
			created: number
			status: string
			currency: string
			amount: number
			remarks: string
			auto_reversed: boolean
		}>
	}
}

const retrieveCharge = async (
	data: RetrieveChargeData,
): Promise<RetrieveChargeResponse> => {
	const response = await client.get(`/charges/${data.charge_id}`)
	return response.data
}

export interface UpdateChargeData {
	charge_id: string
	description?: string
	receipt?: {
		email?: boolean
		sms?: boolean
	}
	metadata?: {
		udf1?: string
	}
}

export interface UpdateChargeResponse {
	id: string
	object: string
	live_mode: boolean
	api_version: string
	method: string
	status: string
	amount: number
	currency: string
	threeDSecure: boolean
	card_threeDSecure: boolean
	save_card: boolean
	merchant_id: string
	product: string
	description: string
	metadata?: {
		udf1?: string
	}
	transaction: {
		authorization_id: string
		timezone: string
		created: string
		expiry: {
			period: number
			type: string
			asynchronous: boolean
			amount: number
			currency: string
			reference: {
				track: string
				payment: string
				gateway: string
				acquirer: string
				transaction: string
				order: string
			}
		}
		response: {
			code: string
			message: string
			acquirer?: {
				response: {
					code: string
					message: string
				}
			}
			gateway?: {
				response: {
					code: string
					message: string
				}
			}
		}
		card: {
			object: string
			first_six: string
			scheme: string
			brand: string
			type: string
			category: string
			last_four: string
		}
		receipt: {
			id: string
			email: boolean
			sms: boolean
		}
		customer: {
			id: string
			first_name: string
			last_name: string
			email: string
			phone?: {
				country_code: string
				number: string
			}
		}
		merchant: {
			country: string
			currency: string
			id: string
		}
		source: {
			object: string
			type: string
			payment_type: string
			payment_method: string
			channel: string
			id: string
		}
		redirect?: {
			status: string
			url: string
		}
		post?: {
			status: string
			url: string
		}
		issuer?: {
			id: string
			name: string
			country: string
			region: string
		}
		activities?: Array<{
			id: string
			object: string
			created: number
			status: string
			currency: string
			amount: number
			remarks: string
			auto_reversed: boolean
		}>
	}
}

const updateCharge = async (
	data: UpdateChargeData,
): Promise<UpdateChargeResponse> => {
	const response = await client.put(`/charges/${data.charge_id}`, data)
	return response.data
}

export interface ListChargeData {
	period?: {
		date?: {
			from?: string
			to?: string
		}
		type?: string
	}
	status?: string
	sources?: string[]
	payment_methods?: string[]
	customers?: string[]
	charges?: string[]
	starting_after?: string
	limit?: number
}

export interface ListChargeResponse {
	id: string
	object: string
	live_mode: boolean
	api_version: string
	method: string
	status: string
	amount: number
	currency: string
	threeDSecure: boolean
	card_threeDSecure: boolean
	save_card: boolean
	merchant_id: string
	product: string
	description: string
	metadata?: {
		udf1?: string
	}
	transaction: {
		authorization_id: string
		timezone: string
		created: string
		expiry: {
			period: number
			type: string
			asynchronous: boolean
			amount: number
			currency: string
			reference: {
				track: string
				payment: string
				gateway: string
				acquirer: string
				transaction: string
				order: string
			}
		}
		response: {
			code: string
			message: string
			acquirer?: {
				response: {
					code: string
					message: string
				}
			}
			gateway?: {
				response: {
					code: string
					message: string
				}
			}
		}
		card: {
			object: string
			first_six: string
			scheme: string
			brand: string
			type: string
			category: string
			last_four: string
		}
		receipt: {
			id: string
			email: boolean
			sms: boolean
		}
		customer: {
			id: string
			first_name: string
			last_name: string
			email: string
			phone?: {
				country_code: string
				number: string
			}
		}
		merchant: {
			country: string
			currency: string
			id: string
		}
		source: {
			object: string
			type: string
			payment_type: string
			payment_method: string
			channel: string
			id: string
		}
		redirect?: {
			status: string
			url: string
		}
		post?: {
			status: string
			url: string
		}
		issuer?: {
			id: string
			name: string
			country: string
			region: string
		}
		activities?: Array<{
			id: string
			object: string
			created: number
			status: string
			currency: string
			amount: number
			remarks: string
			auto_reversed: boolean
		}>
	}
}

const listAllCharge = async (
	data: ListChargeData,
): Promise<ListChargeResponse[]> => {
	const response = await client.post('/charges/list', data)
	return response.data
}

export default {
	create: createCharge,
	retrieve: retrieveCharge,
	update: updateCharge,
	listAll: listAllCharge,
}
