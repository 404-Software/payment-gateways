import { decrypt, encrypt } from './utils/encryption'
import axios from 'axios'

interface BenefitOrder {
	id: string | number
	total: string | number
}

interface BenefitConfig {
	tranportalId?: string
	tranportalPassword?: string
	terminalResourcekey?: string
	iv?: string
	cancelUrl?: string
	returnUrl?: string
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
	const tranportalId = config?.tranportalId || process.env.BENEFIT_TRANPORTAL_ID
	const tranportalPassword =
		config?.tranportalPassword || process.env.BENEFIT_TRANPORTAL_PASSWORD
	const terminalResourcekey =
		config?.terminalResourcekey || process.env.BENEFIT_TERMINAL_RESOURCE_KEY
	const cancelUrl = config?.cancelUrl || process.env.BENEFIT_CANCEL_URL
	const returnUrl = config?.returnUrl || process.env.BENEFIT_RETURN_URL
	const testMode = config?.testMode || process.env.BENEFIT_TEST_MODE === 'true'

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

	const url = res.data[0].result

	return {
		paymentId: url.split('PaymentID=')[1],
		paymentUrl: url,
	}
}

export const DecryptBenefitTrandata = decrypt
