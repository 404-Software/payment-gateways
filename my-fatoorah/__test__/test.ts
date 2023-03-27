require('dotenv').config()
import { myFatoorahExecutePayment, myFatoorahInitiatePayment } from '../src'

// ENVIRONMENT VARIABLES ARE SET FOR THE TESTS

describe('getPaymentMethods', () => {
	it('should get payment methods', async () => {
		const {
			Data: { PaymentMethods },
		} = await myFatoorahInitiatePayment({
			request: {
				InvoiceAmount: 35.4,
				CurrencyIso: 'BHD',
			},
		})

		console.log(PaymentMethods)

		expect(PaymentMethods.length > 0).toBe(true)
	})
})

describe('createPaymentSession', () => {
	it('should create a payment session', async () => {
		const {
			Data: { PaymentURL },
		} = await myFatoorahExecutePayment({
			request: {
				InvoiceValue: 35.4,
				PaymentMethodId: 1,
			},
		})

		console.log(PaymentURL)

		expect(typeof PaymentURL).toBe('string')
	})
})
