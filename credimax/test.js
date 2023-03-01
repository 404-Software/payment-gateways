require('dotenv').config()

const CreateCredimaxSession = require('./index.js')

const run = async () => {
	console.log(
		await CreateCredimaxSession({
			order: {
				id: `123${Math.random()}`,
				total: '0.1',
			},
			address: {
				city: 'Manama',
				street: 'Al Seef',
			},
		}),
	)
}

run()
