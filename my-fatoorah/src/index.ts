import axios from 'axios'

const MY_FATOORAH_TOKEN = process.env.MY_FATOORAH_TOKEN
const MY_FATOORAH_TEST_MODE = process.env.MY_FATOORAH_TEST_MODE === 'true'

if (!MY_FATOORAH_TOKEN) throw new Error('MY_FATOORAH_TOKEN is not defined')

const getToken = (token?: string) => {
	return token || MY_FATOORAH_TOKEN
}

const getTestMode = (testMode?: boolean) => {
	return testMode || MY_FATOORAH_TEST_MODE
}

const getBaseUrl = (testMode?: boolean) => {
	return getTestMode(testMode)
		? 'https://apitest.myfatoorah.com/V2'
		: 'https://api.myfatoorah.com/v2'
}

export interface MyFatoorahConfig {
	testMode?: boolean
	token?: string
}

export interface MyFatoorahResponse<T> {
	IsSuccess: boolean
	Message: string
	ValidationErrors: Array<{ Name: string; Error: string }> | null
	Data: T
}

export interface MyFatoorahInitiatePaymentRequest {
	InvoiceAmount: number
	CurrencyIso: 'KWD' | 'SAR' | 'BHD' | 'ARD' | 'QAR' | 'OMR' | 'JOD' | 'EGP'
}

export interface MyFatoorahInitiatePaymentResponse {
	PaymentMethods: Array<{
		PaymentMethodId: number
		PaymentMethodAr: string
		PaymentMethodEn: string
		IsDirectPayment: boolean
		ServiceCharge: number
		TotalAmount: number
		CurrencyIso: string
		ImageUrl: string
	}>
}

export async function myFatoorahInitiatePayment({
	request,
	config,
}: {
	request: MyFatoorahInitiatePaymentRequest
	config?: MyFatoorahConfig
}) {
	const { data } = await axios.post<
		MyFatoorahResponse<MyFatoorahInitiatePaymentResponse>
	>(`${getBaseUrl(config?.testMode)}/InitiatePayment`, request, {
		headers: { Authorization: `Bearer ${getToken()}` },
	})

	return data
}

export interface MyFatoorahExecutePaymentRequest {
	InvoiceValue: number
	PaymentMethodId?: number
	SessionId?: string
	CustomerName?: string
	CallBackUrl?: string
	ErrorUrl?: string
	DisplayCurrencyIso?: string
	MobileCountryCode?: string
	CustomerMobile?: string
	CustomerEmail?: string
	Language?: string
	CustomerReference?: string
	UserDefinedField?: string
	CustomerAddress?: {
		Block: string
		Street: string
		HouseBuildingNo: string
		AddressInstructions: string
	}
	ExpiryDate?: string
	InvoiceItems?: Array<{
		ItemName: string
		Quantity: number
		UnitPrice: number
		Weight: number
		Width: number
		Height: number
		Depth: number
	}>
	ShippingMethod?: number
	Suppliers?: Array<{
		SupplierCode: number
		ProposedShare: number
		InvoiceShare: number
	}>
	RecurringModel?: {
		RecurringType: string
		IntervalDays: number
		Iteration: number
		RetryCount: number
	}
}

export interface MyFatoorahExecutePaymentResponse {
	InvoiceId: number
	IsDirectPayment: boolean
	PaymentURL: string
	CustomerReference: string
	UserDefinedField: string | null
	RecurringId: string
}

export async function myFatoorahExecutePayment({
	request,
	config,
}: {
	request: MyFatoorahExecutePaymentRequest
	config?: MyFatoorahConfig
}) {
	if (!request.PaymentMethodId && !request.SessionId)
		throw new Error('PaymentMethodId or SessionId is required')
	if (request.PaymentMethodId && request.SessionId)
		throw new Error('PaymentMethodId and SessionId cannot be used together')

	const { data } = await axios.post<
		MyFatoorahResponse<MyFatoorahExecutePaymentResponse>
	>(`${getBaseUrl(config?.testMode)}/ExecutePayment`, request, {
		headers: { Authorization: `Bearer ${getToken()}` },
	})

	return data
}

export interface MyFatoorahGetPaymentStatusRequest {
	Key: string
	KeyType: 'InvoiceId' | 'PaymentId' | 'CustomerReference'
}

export interface MyFatoorahGetPaymentStatusResponse {
	InvoiceId: number
	InvoiceStatus: 'Pending' | 'Paid' | 'Canceled'
	InvoiceReference: string
	CustomerReference: string
	CreatedDate: string
	ExpiryDate: string
	ExpiryTime: string
	InvoiceValue: number
	Comments: string
	CustomerName: string
	CustomerMobile: string
	CustomerEmail: string
	UserDefinedField: string
	InvoiceDisplayValue: string
	DueDeposit: number
	DepositStatus: string
	InvoiceItems: Array<{
		ItemName: string
		Quantity: number
		UnitPrice: number
		Weight: number
		Width: number
		Height: number
		Depth: number
	}>
	InvoiceTransactions: Array<{
		TransactionDate: String
		PaymentGateway: string
		ReferenceId: string
		TrackId: string
		TransactionId: string
		PaymentId: string
		AuthorizationId: string
		TransactionStatus: string
		TransactionValue: string
		CustomerServiceCharge: string
		TotalServiceCharge: string
		DueValue: string
		PaidCurrency: string
		PaidCurrencyValue: string
		IpAddress: string
		Country: string
		Currency: string
		Error: string
		CardNumber: string
		ErrorCode: string
	}>
	Suppliers: Array<{
		SupplierCode: number
		SupplierName: string
		InvoiceShare: number
		ProposedShare: number
		DepositShare: number
	}>
}

export async function myFatoorahGetPaymentStatus({
	request,
	config,
}: {
	request: MyFatoorahGetPaymentStatusRequest
	config?: MyFatoorahConfig
}) {
	const { data } = await axios.post<
		MyFatoorahResponse<MyFatoorahGetPaymentStatusResponse>
	>(`${getBaseUrl(config?.testMode)}/GetPaymentStatus`, request, {
		headers: { Authorization: `Bearer ${getToken()}` },
	})

	return data
}
