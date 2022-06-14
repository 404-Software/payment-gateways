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

type DecryptionDataInput = { buffer: Buffer; key?: string; iv?: string }
type DecryptionDataOutput = {
	date: string
	authRespCode: string
	authCode: string
	transId: number
	trackId: string
	udf5: string
	udf6: string
	udf10: string
	amt: string
	udf3: string
	udf4: string
	udf1: string
	udf2: string
	result: string
	ref: string
	udf9: string
	paymentId: number
	udf7: string
	udf8: string
}

declare module '@404-software/benefit' {
	export declare function CreateBenefitSession(
		data: BenefitSession,
	): Promise<string>

	export declare function DecryptBenefitTrandata(
		data: DecryptionDataInput,
	): DecryptionDataOutput
}
