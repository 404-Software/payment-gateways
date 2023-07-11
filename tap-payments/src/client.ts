import axios from 'axios'

const baseURL = 'https://api.tap.company/v2'
const API_KEY = process.env.TAP_API_KEY

const client = axios.create({
	baseURL,
	headers: { Authorization: `Bearer ${API_KEY}` },
})

export default client
