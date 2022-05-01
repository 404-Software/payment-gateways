/* eslint-disable no-unused-vars */
type Address = {
	city: string
	street?: string
}

type Order = {
	id: string | number
	total: string | number
}

type Config = {
	merchantId: string
	APIPassword: string
	cancelUrl: string
	returnUrl: string
	shopName: string
}

type CredimaxSession = {
	order: Order
	address: Address
	config?: Config
}

declare module '@404-software/credimax' {
	function CreateCredimaxSession({
		orderId,
		totalAmount,
		address,
		config,
	}: CredimaxSession): string

	export default CreateCredimaxSession
}
