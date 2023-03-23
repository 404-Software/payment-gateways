import { decrypt, encrypt } from './utils/encryption'
import axios from 'axios'

interface BenefitOrder {
	id: string | number
	total: string | number
}

interface BenefitConfig {
	tranportalId: string
	tranportalPassword: string
	terminalResourcekey: string
	iv: string
	cancelUrl: string
	returnUrl: string
	testMode?: boolean
}

interface BenefitSession {
	order: BenefitOrder
	config?: BenefitConfig
}

export const CreateBenefitSession = async ({
	config,
	order,
}: BenefitSession) => {
	const tranportalId = process.env.BENEFIT_TRANPORTAL_ID || config?.tranportalId
	const tranportalPassword =
		process.env.BENEFIT_TRANPORTAL_PASSWORD || config?.tranportalPassword
	const terminalResourcekey =
		process.env.BENEFIT_TERMINAL_RESOURCE_KEY || config?.terminalResourcekey
	const cancelUrl = process.env.BENEFIT_CANCEL_URL || config?.cancelUrl
	const returnUrl = process.env.BENEFIT_RETURN_URL || config?.returnUrl
	const testMode = process.env.BENEFIT_TEST_MODE === 'true' || config?.testMode

	if (
		!tranportalId ||
		!tranportalPassword ||
		!terminalResourcekey ||
		!cancelUrl ||
		!returnUrl
	)
		throw new Error(
			'The BENEFIT_TRANPORTAL_ID, BENEFIT_TRANPORTAL_PASSWORD, BENEFIT_TERMINAL_RESOURCE_KEY, BENEFIT_IV, BENEFIT_CANCEL_URL and BENEFIT_RETURN_URL environment variables must be set OR provide a config to the function',
		)

	const data = [
		{
			action: '1',
			currencycode: '048',
			cardType: 'D',
			amt: order.total,
			password: tranportalPassword,
			id: tranportalId,
			resourceKey: terminalResourcekey,
			trackid: `${order.id}-${Math.round(new Date().getTime() / 1000)}`,
			responseURL: returnUrl,
			errorURL: cancelUrl,
			langid: 'USA',
			udf1: `${order.id}`,
		},
	]

	const trandata = encrypt({
		trandata: JSON.stringify(data),
	})

	const apiUrl = `https://www.${
		testMode ? 'test.' : ''
	}benefit-gateway.bh/payment/API/hosted.htm`

	const res = await axios.post<Array<{ result: string }>>(apiUrl, [
		{ trandata, id: tranportalId },
	])

	return res.data[0].result
}

export const DecryptBenefitTrandata = decrypt
