# About

This package provides helper functions to handle integration with My Fatoorah's API.

<br/><br/>

# How to use

You can set the following environment variables:

```shell
MY_FATOORAH_TOKEN="My Fatoorah Token"
MY_FATOORAH_TEST_MODE=false
```

or alternatively, you can pass these details to the config of the function directly.

<br/><br/>

# Example

```typescript
import { myFatoorahInitiatePayment myFatoorahExecutePayment } from '@404-software/my-fatoorah'

const { Data: { PaymentMethods } } = await myFatoorahInitiatePayment({
	request: {
		InvoiceAmount: 35.4,
		CurrencyIso: 'BHD',
	},
	config: {
		token: 'TOKEN',
		testMode: false,
	},
})

const paymentMethodId = PaymentMethods[0].PaymentMethodId

const { Data: { PaymentURL } } = await myFatoorahExecutePayment({
	request: {
		InvoiceValue: 35.4,
		PaymentMethodId: paymentMethodId,
    CallbackUrl: 'https://404-software.com/payment',
    ErrorUrl: 'https://404-software.com/payment',
	},
	config: {
		token: 'TOKEN',
		testMode: false,
	},
})
```
