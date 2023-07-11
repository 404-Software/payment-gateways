require('dotenv').config()
import { CreateCredimaxSession } from '../src'

// ENVIRONMENT VARIABLES ARE SET FOR THE TESTS

describe('createSession', () => {
	it('should create a session', async () => {
		const session = await CreateCredimaxSession({
			order: {
				id: '123',
				total: '100',
				currency: 'USD',
				description: 'test',
			},
			address: {
				country: 'SAU',
				city: 'Manama',
				street: 'Al Seef',
			},
			config: {
				information: {
					name: 'hello',
				},
			},
		})

		console.log(session)

		expect(typeof session.paymentUrl).toBe('string')
	})
})
