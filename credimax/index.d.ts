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

declare module '@404-software/credimax' {
	function CreateCredimaxSession(data: CredimaxSession): Promise<string>

	export default CreateCredimaxSession
}
