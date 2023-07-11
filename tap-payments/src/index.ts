import authorize from './endpoints/authorize'
import business from './endpoints/business'
import charges from './endpoints/charges'
import customer from './endpoints/customer'
import file from './endpoints/file'
import invoices from './endpoints/invoices'
import lead from './endpoints/lead'
import merchant from './endpoints/merchant'
import operator from './endpoints/operator'
import refund from './endpoints/refund'
import subscription from './endpoints/subscription'
import tokens from './endpoints/tokens'

const TapPayments = {
	tokens,
	authorize,
	charges,
	refund,
	invoices,
	subscription,
	lead,
	customer,
	operator,
	file,
	business,
	merchant,
}

export default TapPayments
