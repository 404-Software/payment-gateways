import client from '../client'

export interface CreateAuthorizeData {
	amount: number
	currency: string
	customer_initiated: string
	threeDSecure: boolean
	save_card: boolean
	payment_agreement?: {
		id: string
		statement_descriptor?: string
		metadata?: {
			udf1?: string
			udf2?: string
			udf3?: string
		}
		reference?: {
			transaction?: string
			order?: string
		}
		receipt?: {
			email?: boolean
			sms?: boolean
		}
		customer?: {
			id?: string
			first_name?: string
			middle_name?: string
			last_name?: string
			email?: string
			phone?: {
				country_code?: string
				number?: string
			}
		}
		source?: {
			id?: string
		}
		auto?: {
			type?: string
			time?: number
		}
		post?: {
			url?: string
		}
		redirect?: {
			url?: string
		}
	}
}

export interface CreateAuthorizeResponse {
	id: string
	object: string
	live_mode: boolean
	api_version: string
	method: string
	status: string
	amount: number
	currency: string
	threeDSecure: boolean
	save_card: boolean
	merchant_id: string
	product: string
	statement_descriptor: string
	transaction: {
		timezone: string
		created: string
		url: string
		expiry: {
			asynchronous: boolean
			amount: number
			currency: string
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
			phone: {
				source: {
					object: string
					id: string
				}
			}
		}
	}
	redirect: {
		status: string
		url: string
	}
	post: {
		status: string
		url: string
	}
	auto: {
		status: string
		type: string
		time: number
	}
	metadata: {
		udf1: string
		udf2: string
		udf3: string
	}
}

const createAuthorize = async (
	data: CreateAuthorizeData,
): Promise<CreateAuthorizeResponse> => {
	const response = await client.post('authorize', data)
	return response.data
}

export interface RetrieveAuthorizeData {
	authorize_id: string
}

export interface RetrieveAuthorizeResponse {
	id: string
	object: string
	live_mode: boolean
	api_version: string
	method: string
	status: string
	amount: number
	currency: string
	threeDSecure: boolean
	save_card: boolean
	merchant_id: string
	product: string
	statement_descriptor: string
	transaction: {
		timezone: string
		created: string
		url: string
		expiry: {
			asynchronous: boolean
			amount: number
			currency: string
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
			phone: {
				source: {
					object: string
					id: string
				}
			}
		}
	}
	redirect: {
		status: string
		url: string
	}
	post: {
		status: string
		url: string
	}
	auto: {
		status: string
		type: string
		time: number
	}
	metadata: {
		udf1: string
		udf2: string
		udf3: string
	}
}

const retrieveAuthorize = async (
	data: RetrieveAuthorizeData,
): Promise<RetrieveAuthorizeResponse> => {
	const response = await client.get(`/authorize/${data.authorize_id}`)
	return response.data
}

export interface UpdateAuthorizeData {
	authorize_id: string
	description?: string
	receipt?: {
		email?: boolean
		sms?: boolean
	}
	metadata?: {
		udf1?: string
		udf2?: string
		udf3?: string
	}
}

export interface UpdateAuthorizeResponse {
	id: string
	object: string
	live_mode: boolean
	api_version: string
	method: string
	status: string
	amount: number
	currency: string
	threeDSecure: boolean
	save_card: boolean
	merchant_id: string
	product: string
	statement_descriptor: string
	transaction: {
		timezone: string
		created: string
		url: string
		expiry: {
			asynchronous: boolean
			amount: number
			currency: string
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
			phone: {
				source: {
					object: string
					id: string
				}
			}
		}
	}
	redirect: {
		status: string
		url: string
	}
	post: {
		status: string
		url: string
	}
	auto: {
		status: string
		type: string
		time: number
	}
	metadata: {
		udf1: string
		udf2: string
		udf3: string
	}
}

const updateAuthorize = async (
	data: UpdateAuthorizeData,
): Promise<UpdateAuthorizeResponse> => {
	const response = await client.put(`/authorize/${data.authorize_id}`, data)
	return response.data
}

export interface VoidAuthorizeData {
	authorize_id: string
}

export interface VoidAuthorizeResponse {
	id: string
	object: string
	live_mode: boolean
	api_version: string
	method: string
	status: string
	amount: number
	currency: string
	threeDSecure: boolean
	save_card: boolean
	merchant_id: string
	product: string
	statement_descriptor: string
	transaction: {
		timezone: string
		created: string
		url: string
		expiry: {
			asynchronous: boolean
			amount: number
			currency: string
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
			phone: {
				source: {
					object: string
					id: string
				}
			}
		}
	}
	redirect: {
		status: string
		url: string
	}
	post: {
		status: string
		url: string
	}
	auto: {
		status: string
		type: string
		time: number
	}
	metadata: {
		udf1: string
		udf2: string
		udf3: string
	}
}

const voidAuthorize = async (
	data: VoidAuthorizeData,
): Promise<VoidAuthorizeResponse> => {
	const response = await client.post(`/authorize/${data.authorize_id}`)
	return response.data
}

export interface ListAuthorizeData {
	period?: {
		date: {
			from: number
			to: number
		}
	}
	status?: string
	sources?: string[]
	payment_methods?: string
	customers?: string[]
	authorizes?: string[]
	starting_after?: string
	limit?: number
}

export interface ListAuthorizeResponse {
	id: string
	object: string
	live_mode: boolean
	api_version: string
	method: string
	status: string
	amount: number
	currency: string
	threeDSecure: boolean
	save_card: boolean
	merchant_id: string
	product: string
	statement_descriptor: string
	transaction: {
		timezone: string
		created: string
		url: string
		expiry: {
			asynchronous: boolean
			amount: number
			currency: string
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
			phone: {
				source: {
					object: string
					id: string
				}
			}
		}
	}
	redirect: {
		status: string
		url: string
	}
	post: {
		status: string
		url: string
	}
	auto: {
		status: string
		type: string
		time: number
	}
	metadata: {
		udf1: string
		udf2: string
		udf3: string
	}
}

const listAllAuthorize = async (
	data: ListAuthorizeData,
): Promise<ListAuthorizeResponse[]> => {
	const response = await client.post(`/authorize/list`, data)
	return response.data
}

export default {
	create: createAuthorize,
	retrieve: retrieveAuthorize,
	update: updateAuthorize,
	void: voidAuthorize,
	listAll: listAllAuthorize,
}
