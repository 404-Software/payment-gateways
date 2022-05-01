# About

This package helps in generating a Credimax (Bahrain) payment session using a link that can be passed to the user to pay using Credimax's hosted session.

API VERSION: 63

# How to use:

1- you can set the following environment variables:

    CREDIMAX_SHOP_NAME = "Shop name"
    CREDIMAX_RETURN_URL = "Website's return URL"
    CREDIMAX_CANCEL_URL = "Website's cancel URL"
    CREDIMAX_MERCHANT_ID = "Merchant ID"
    CREDIMAX_API_PASSWORD = "API Password"

alternatively, you can pass the details to the config of the function.

2- You need to pass the following object to the function:

    {
    	orderId: *String || Number*,
    	totalAmount: *String || Number*,
    	address: {
    		street: *String*,
    		city: *String*
    	},
    	config (If not using environment variables): {
    		merchantId: *String*,
    		APIPassword: *String*,
    		cancelUrl: *String*,
    		returnUrl: *String*,
    		shopName: *String*
    	}
    }

3- The function will return to you a URL that you can use to initiate the payment.

**Example**

    import  CreateCredimaxSession  from  '@404-software/credimax'

    await CreateCredimaxSession({
        orderId: "123",
        totalAmount: "200.500",
        address: {
    	    city:  "Manama",
    	    street:  "Block 1, Street 2, Building 3",
    	},
    })
