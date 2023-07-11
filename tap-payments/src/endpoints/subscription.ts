import client from '../client'

export interface CreateSubscriptionData {
	term: {
		interval: string
		period: number
		from: string
		due?: number
		auto_renew?: boolean
		timezone?: string
	}
	trial?: {
		days: number
		amount?: number
	}
	charge: {
		amount: number
		currency: string
		description: string
		statement_descriptor: string
		metadata?: {
			udf1?: string
			udf2?: string
		}
	}
	post?: {
		receipt?: {
			email?: boolean
			sms?: boolean
		}
	}
	customer?: {
		id?: string
		source?: {
			id?: string
		}
	}
}

export interface CreateSubscriptionResponse {
	id: string
	status: string
	merchant_id: string
	term: {
		interval: string
		period: number
		from: string
		due?: number
		auto_renew?: boolean
		timezone?: string
	}
	trial?: {
		days: number
		amount?: number
	}
	charge: {
		amount: number
		currency: string
		description: string
	}
	reference: {
		receipt?: {
			customer?: {
				source?: {
					id?: string
				}
			}
		}
	}
	post?: {
		subscription_id: string
	}
}

const createSubscription = async (
	data: CreateSubscriptionData,
): Promise<CreateSubscriptionResponse> => {
	const response = await client.post('/subscriptions/v1', data)
	return response.data
}

export interface RetrieveSubscriptionData {
	subscription_id: string
}

export interface RetrieveSubscriptionResponse {
	live_mode: boolean
	object: string
	api_version: string
	feature_version: string
	subscription: {
		id: string
		status: string
		merchant_id: string
		amount: number
		currency: string
		term: {
			interval: string
			period: number
			from: string
			due?: number
			auto_renew?: boolean
			timezone?: string
			count?: number
			days_until_due?: number
			charges?: unknown[]
		}
	}
}

const retrieveSubscription = async (
	data: RetrieveSubscriptionData,
): Promise<RetrieveSubscriptionResponse> => {
	const response = await client.get(`/subscriptions/v1/${data.subscription_id}`)
	return response.data
}

export interface UpdateSubscriptionData {
	subscription_id: string
	amount?: number
	auto_renew?: boolean
	description?: string
	statement_descriptor?: string
}

export interface UpdateSubscriptionResponse {
	subscription_id: string
	amount: number
	description: string
	statement_descriptor: string
	metadata: {
		udf1: string
		udf2: string
	}
	reference: {
		transaction: string
		order: string
		receipt: {
			email: boolean
			sms: boolean
		}
	}
}

const updateSubscription = async (
	data: UpdateSubscriptionData,
): Promise<UpdateSubscriptionResponse> => {
	const response = await client.put('/subscriptions/v1', data)
	return response.data
}

export interface CancelSubscriptionData {
	subscription_id: string
}

export interface CancelSubscriptionResponse {
	object: string
	id: string
	live_mode: boolean
	api_version: string
	feature_version: string
	status: string
}

const cancelSubscription = async (
	data: CancelSubscriptionData,
): Promise<CancelSubscriptionResponse> => {
	const response = await client.delete(
		`/subscription/v1/${data.subscription_id}`,
	)
	return response.data
}

export interface ListAllSubscriptionData {
	period: {
		date: {
			from: number
			to: number
		}
	}
	customers?: string[]
	cards?: string[]
	subscriptions?: string[]
	starting_after?: number
	limit?: number
}

export interface ListAllSubscriptionResponse {
	object: string
	subscription_id: string
	type: number
	term: number
	auto_renew: boolean
	start_date: string
	due: number
	timezone: string
	live_mode: boolean
	api_version: string
	is_active: boolean
	appTransactions: unknown[]
}

const listAllSubscription = async (
	data: ListAllSubscriptionData,
): Promise<ListAllSubscriptionResponse> => {
	const response = await client.get('/subscriptions/v1/list', { params: data })
	return response.data
}

export default {
	create: createSubscription,
	retrieve: retrieveSubscription,
	update: updateSubscription,
	cancel: cancelSubscription,
	listAll: listAllSubscription,
}
