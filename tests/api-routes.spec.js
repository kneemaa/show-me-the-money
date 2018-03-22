const apiRoutes = require('../routes/api-routes')
const request = require('request')
const requestPromise = require('request-promise')
const expects = require('./api-routes-expected.js')

describe('API Routes', () => {
	it('Get Portfolio and User for user ID=1', async () => {
		const expected = expects.portfolio
		const getPortfolio = () => {
			return requestPromise({
				url: "http://localhost:3000/api/portfolio/1"
			}).then(user => {
				return JSON.parse(user)
			})
		}
		const actual = await getPortfolio();
		expect(actual).toEqual(expected)
	})
	it('Get Ledger and User information for Daphne Chen', async () => {
		const expected = expects.ledger
		const getLedger = () => {
			return requestPromise({
				url: "http://localhost:3000/api/ledger/3"
			}).then(ledger => {
				return JSON.parse(ledger)
			})
		}
		const actual = await getLedger()
		expect(actual).toEqual(expected)
	})
})

