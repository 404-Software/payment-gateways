# About

This package helps in generating a Credimax (Bahrain) payment session using a link that can be passed to the user to pay using Credimax's hosted session.

**API VERSION: 70**

<br/><br/>

# How to use

1- you can set the following environment variables:

```shell
CREDIMAX_SHOP_NAME="Shop name"
CREDIMAX_RETURN_URL="Website's return URL"
CREDIMAX_CANCEL_URL="Website's cancel URL"
CREDIMAX_MERCHANT_ID="Merchant ID"
CREDIMAX_API_PASSWORD="API Password"
```

alternatively, you can pass these details to the config of the function directly mentioned in the next step.
<br/><br/><br/>
2- You need to pass the following object to the function:

```typescript
{
  order: {
    id: string | number
    total: string | number
    currency?: 'BHD' | 'USD'
    description?: string
  },
  address: {
	  country: 'BHR' | 'USA' | 'SAU' | 'ARE' | 'KWT' | 'OMN' | 'QAT'
    city: string
    street?: string
  },
  config: { //ONLY if not using environment variables
    credentials?: {
      id?: string
      password?: string
    }
    urls?: {
      returnUrl?: string
      cancelUrl?: string
    }
    information?: {
      name?: string
      logo?: string
    }
  }
}
```

<br/><br/>

# Example

```typescript
import { CreateCredimaxSession } from '@404-software/credimax'

const { paymentUrl, successIndicator } = await CreateCredimaxSession({
	order: {
		id: '123',
		total: 20.5,
	},
	address: {
		city: 'Manama',
		street: 'Block 1, Street 2, Building 3',
	},
})
```
