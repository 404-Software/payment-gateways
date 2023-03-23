require('dotenv').config()
import { CreateBenefitSession, DecryptBenefitTrandata } from '../src'

const TRANDATA =
	'trandata=FEA9762DE5DF5E1EF47D796D49A0D128DF882FDDCC66935C80B1CCD7F3C5A2AFE69972E02BB4462D9C2F9AFCD3852B956A2DDE4E7C8FE7CE3297FD43563EA285992F4DEF1338F1D159C30A5E15BE98B69001F7C1E9D7D4CDA7F8B42B57B6208FE1E1A3B5DDF115899AA16091F7B7790FDBCE0760AE2A02D4DDE47FBCCE9474285A099D875EBFB3BA968469AFD467BE70C33C2D70673773DF83EEECFC309B27EA0FCF0600B35AF7726F70E912905F939DFA0C7E1DF7D2EADC225119ADFEAD26D163AFCF7B5E03588D8B0888FB46AC1120724BAE8E26C0C6DCBCA0DADBE9EC4018AE2333E9EB739C3B5815FB2EDF6B46FF2E86730C726A45384EA3FA3BB134A46A7E069E9FD58DDFBF454D542AB19FE47D6E0B6DA9304A73A5BF9504AAF0FBD107D0E71BC10D147A6C581F9CC53BF7A1D3836E878D9B00ADF21EF363E8F194F1E86EFD46E5BFC5F6873C6D951DE10C8B98B081EB016B83366E60D7A27E371355B4A1F8498D9C25EEFD49FC5ED39BF68C772700DBC82BDCCBB6306EF75C5739989CE298763943104315FE86F976AA265C7F3EA1DF90C654E0551AC73552C10AF164D3FC6296A508EDAF3343E09A41E41B8F'

// ENVIRONMENT VARIABLES ARE SET FOR THE TESTS

describe('createSession', () => {
	it('should create a session', async () => {
		const session = await CreateBenefitSession({
			order: { id: '123', total: 100 },
		})

		console.log(session)

		expect(typeof session).toBe('string')
	})
})

describe('decryptTrandata', () => {
	it('should decrypt the trandata', async () => {
		const result = DecryptBenefitTrandata({
			buffer: Buffer.from(TRANDATA, 'utf-8'),
		})

		console.log(result)

		expect(typeof result.id).toBe('string')
	})
})
