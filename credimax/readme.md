# About

This package helps in generating a Credimax (Bahrain) payment session using a link that can be passed to the user to pay using Credimax's hosted session.

**API VERSION: 64**

<br/><br/>

# How to use

1- you can set the following environment variables:

    CREDIMAX_SHOP_NAME="Shop name"
    CREDIMAX_RETURN_URL="Website's return URL"
    CREDIMAX_CANCEL_URL="Website's cancel URL"
    CREDIMAX_MERCHANT_ID="Merchant ID"
    CREDIMAX_API_PASSWORD="API Password"

alternatively, you can pass these details to the config of the function directly mentioned in the next step.
<br/><br/><br/>
2- You need to pass the following object to the function:

    {
      order: {
        id: *String || Number*,
        total: *String || Number*
      },
      address: {
        city: *String*,
        street: *String*
      },
      config (ONLY if not using environment variables): {
        merchantId: *String*,
        APIPassword: *String*,
        cancelUrl: *String*,
        returnUrl: *String*,
        shopName: *String*
      }
    }

<br/><br/>

# Example

    import CreateCredimaxSession from '@404-software/credimax'

    await CreateCredimaxSession({
      order: {
        id: "123",
        total: 20.5
      },
      address: {
        city: "Manama",
        street: "Block 1, Street 2, Building 3",
      },
    })
