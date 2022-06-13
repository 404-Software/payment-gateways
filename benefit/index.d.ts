/* eslint-disable no-unused-vars */

type Order = {
	id: string | number
	total: string | number
}

type Config = {
	transportalId: string
	transportalPassword: string
	terminalResourcekey: string
	iv: string
	cancelUrl: string
	returnUrl: string
	testMode?: boolean
}

type BenefitSession = {
	order: Order
	config?: Config
}

declare module '@404-software/benefit' {
	function CreateBenefitSession(data: BenefitSession): Promise<string>

	export default CreateBenefitSession
}
