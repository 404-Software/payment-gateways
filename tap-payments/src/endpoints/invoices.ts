import client from '../client'

export interface CreateInvoiceData {
	draft?: boolean
	due: number
	expiry: number
	description?: string
	mode?: string
	note?: string
	notifications?: {
		channels?: string[]
		dispatch?: boolean
	}
	currencies?: string[]
	metadata?: {
		udf1?: string
		udf2?: string
		udf3?: string
		charge?: {
			receipt?: {
				email?: boolean
				sms?: boolean
			}
			statement_descriptor?: string
		}
	}
	customer?: {
		id?: string
		first_name?: string
		last_name?: string
		email?: string
		phone?: {
			country_code?: string
			number?: string
		}
		statement_descriptor?: string
	}
	order: {
		id?: string
		amount?: number
		currency?: string
		items?: Array<{
			product_id?: string
			amount?: number
			currency?: string
			description?: string
			discount?: object
		}>
		shipping?: object
		tax?: object[]
	}
	payment_methods?: string[]
	post?: {
		redirect?: {
			url?: string
		}
	}
	reference?: {
		invoice?: string
		order?: string
	}
}

const createInvoice = async (data: CreateInvoiceData): Promise<unknown> => {
	const response = await client.post('/invoices', data)
	return response.data
}

export interface RetrieveInvoiceData {
	invoice_id: string
}

const retrieveInvoice = async (data: RetrieveInvoiceData): Promise<unknown> => {
	const response = await client.get(`/invoices/${data.invoice_id}`)
	return response.data
}

export interface UpdateInvoiceData {
	invoice_id: string
	draft?: boolean
	due?: number
	expiry?: number
	description?: string
	mode?: string
	note?: string
	notifications?: {
		channels?: string[]
		dispatch?: boolean
	}
	channels?: string[]
	dispatch?: boolean
	currencies?: string[]
	metadata?: {
		udf1?: string
		udf2?: string
		udf3?: string
		charge?: {
			receipt?: {
				email?: boolean
				sms?: boolean
			}
			statement_descriptor?: string
		}
	}
	customer?: {
		id?: string
		first_name?: string
		last_name?: string
		email?: string
		phone?: {
			country_code?: string
			number?: string
		}
		statement_descriptor?: string
	}
	order?: {
		id?: string
		amount?: number
		currency?: string
		items?: Array<{
			product_id?: string
			amount?: number
			currency?: string
			description?: string
			discount?: object
		}>
		shipping?: object
		tax?: object[]
	}
	payment_methods?: string[]
	post?: {
		url?: string
	}
	redirect?: {
		url?: string
	}
	reference?: {
		invoice?: string
		order?: string
	}
	invoicer?: {
		to?: string
		cc?: string
		bcc?: string
	}
}

const updateInvoice = async (data: UpdateInvoiceData): Promise<unknown> => {
	const response = await client.put(`/invoices/${data.invoice_id}`, data)
	return response.data
}

export interface CancelInvoiceData {
	invoice_id: string
}

const cancelInvoice = async (data: CancelInvoiceData): Promise<unknown> => {
	const response = await client.delete(`/invoices/${data.invoice_id}`)
	return response.data
}

export interface RemindInvoiceData {
	invoice_id: string
}

const remindInvoice = async (data: RemindInvoiceData): Promise<unknown> => {
	const response = await client.post(`/invoices/${data.invoice_id}/remind`)
	return response.data
}

export interface FinalizeInvoiceData {
	invoice_id: string
}

const finalizeInvoice = async (data: FinalizeInvoiceData): Promise<unknown> => {
	const response = await client.post(`/invoices/${data.invoice_id}/finalize`)
	return response.data
}

const listAllInvoice = async (): Promise<unknown> => {
	const response = await client.get('/invoices/list')
	return response.data
}

export default {
	create: createInvoice,
	retrieve: retrieveInvoice,
	update: updateInvoice,
	cancel: cancelInvoice,
	remind: remindInvoice,
	finalize: finalizeInvoice,
	listAll: listAllInvoice,
}
