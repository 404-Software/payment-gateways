require('dotenv').config()
import { CreateCredimaxSession } from '../src'

// ENVIRONMENT VARIABLES ARE SET FOR THE TESTS

describe('createSession', () => {
	it('should create a session', async () => {
		const session = await CreateCredimaxSession({
			order: {
				id: `123${Math.random()}`,
				total: '0.1',
			},
			address: {
				city: 'Manama',
				street: 'Al Seef',
			},
		})

		console.log(session)

		expect(typeof session.paymentUrl).toBe('string')
	})
})
