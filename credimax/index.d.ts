/* eslint-disable no-unused-vars */
type Address = {
	street: string
	city: string
}

type Config = {
	merchantId: string
	APIPassword: string
	cancelUrl: string
	returnUrl: string
	shopName: string
}

type CredimaxSession = {
	orderId: string | number
	totalAmount: string | number
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
