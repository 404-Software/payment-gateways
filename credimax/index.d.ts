/* eslint-disable no-unused-vars */

type Order = {
	id: string | number
	total: string | number
}

type Address = {
	city: string
	street?: string
}

type Config = {
	merchantId: string
	APIPassword: string
	cancelUrl: string
	returnUrl: string
	shopName: string
	testMode?: boolean
}

type CredimaxSession = {
	order: Order
	address: Address
	config?: Config
}

type CredimaxResponse = {
	successIndicator: string
	paymentUrl: string
}

declare module '@404-software/credimax' {
	function CreateCredimaxSession(
		data: CredimaxSession,
	): Promise<CredimaxResponse>

	export default CreateCredimaxSession
}
