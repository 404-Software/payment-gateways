import client from '../client'

export interface CreateRefundData {
	charge_id: string
	amount: number
	currency: string
	reason?: string
}

export interface CreateRefundResponse {
	id: string
	object: string
	api_version: string
	live_mode: boolean
	amount: number
	charge_id: string
	created: string
	currency: string
	status: string
	reference: {
		merchant: string
		response: {
			code: string
			message: string
		}
	}
	metadata?: {
		udf1?: string
		udf2?: string
	}
	description?: string
	reason?: string
	post?: {
		url: string
		status: string
	}
}

const createRefund = async (
	data: CreateRefundData,
): Promise<CreateRefundResponse> => {
	const response = await client.post('/refunds', data)
	return response.data
}

export interface RetrieveRefundData {
	refund_id: string
}

export interface RetrieveRefundResponse {
	id: string
	object: string
	api_version: string
	live_mode: boolean
	amount: number
	charge_id: string
	created: string
	currency: string
	status: string
	reference: {
		merchant: string
		response: {
			code: string
			message: string
		}
	}
	metadata?: {
		udf1?: string
		udf2?: string
	}
	description?: string
	reason?: string
	post?: {
		url: string
		status: string
	}
}

const retrieveRefund = async (
	data: RetrieveRefundData,
): Promise<RetrieveRefundResponse> => {
	const response = await client.get(`/refunds/${data.refund_id}`)
	return response.data
}

export interface UpdateRefundData {
	refund_id: string
	metadata?: string
}

export interface UpdateRefundResponse {
	id: string
	object: string
	api_version: string
	live_mode: boolean
	amount: number
	charge_id: string
	created: string
	currency: string
	status: string
	reference: {
		merchant: string
		response: {
			code: string
			message: string
		}
	}
	metadata?: {
		udf1?: string
		udf2?: string
	}
	description?: string
	reason?: string
	post?: {
		url: string
		status: string
	}
}

const updateRefund = async (
	data: UpdateRefundData,
): Promise<UpdateRefundResponse> => {
	const response = await client.put(`/refunds/${data.refund_id}`, data)
	return response.data
}

export interface ListRefundData {
	period?: {
		date?: {
			from?: number
			to?: number
		}
		refunds?: string[]
	}
	charges?: string[]
	starting_after?: string
	limit?: number
}

export interface ListRefundResponse {
	id: string
	object: string
	api_version: string
	live_mode: boolean
	amount: number
	charge_id: string
	created: string
	currency: string
	status: string
	reference: {
		merchant: string
		response: {
			code: string
			message: string
		}
	}
	metadata?: {
		udf1?: string
		udf2?: string
	}
	description?: string
	reason?: string
	post?: {
		url: string
		status: string
	}
}

const listAllRefund = async (
	data: ListRefundData,
): Promise<ListRefundResponse> => {
	const response = await client.post('/refunds/list', data)
	return response.data
}

export default {
	create: createRefund,
	retrieve: retrieveRefund,
	update: updateRefund,
	listAll: listAllRefund,
}
