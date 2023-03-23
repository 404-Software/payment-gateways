# About

This package helps in generating a Benefit (Bahrain) payment session using a link that can be passed to the user to pay using Benefit's hosted session.

<br/><br/>

# How to use

1- you can set the following environment variables:

```shell
BENEFIT_TRANSPORTAL_ID="Transportal Id"
BENEFIT_TRANSPORTAL_PASSWORD="Transportal Password"
BENEFIT_TERMINAL_RESOURCE_KEY="Terminal Resource Key"
BENEFIT_IV="Initialization Vector"
BENEFIT_CANCEL_URL="Website's cancel URL"
BENEFIT_RETURN_URL="Website's return URL"
BENEFIT_TEST_MODE=false
```

alternatively, you can pass these details to the config of the function directly mentioned in the next step.
<br/><br/><br/>
2- You need to pass the following object to the CreateBenefitSession function:

```typescript
{
  order: {
    id: string | number
    total: string | number
  },
  config: { //ONLY if not using environment variables
    tranportalId: string
    tranportalPassword: string
    terminalResourcekey: string
    iv: string
    cancelUrl: string
    returnUrl: string
    testMode?: boolean // defaults to false
  }
}
```

<br/><br/>

# Example

```typescript
import { CreateBenefitSession } from '@404-software/benefit'

const paymentUrl = await CreateBenefitSession({
	order: {
		id: '123',
		total: 20.5,
	},
})
```

<br/><br/>

# Decrypting Response

```typescript
import { DecryptBenefitTrandata } from '@404-software/benefit'

const buffer = req.body

const { id } = await DecryptBenefitTrandata({ buffer })
```
