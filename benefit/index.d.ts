/* eslint-disable no-unused-vars */

type Order = {
	id: string | number
	total: string | number
}

type Config = {
	tranportalId: string
	tranportalPassword: string
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type DecryptionDataInput = { buffer: any; key?: string; iv?: string }
type DecryptionDataOutput = {
	date: string
	authRespCode: string
	authCode: string
	tranId: number
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
	id: string
}

declare module '@404-software/benefit' {
	export declare function CreateBenefitSession(
		data: BenefitSession,
	): Promise<string>

	export declare function DecryptBenefitTrandata(
		data: DecryptionDataInput,
	): DecryptionDataOutput
}
