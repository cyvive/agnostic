const toJsonSchema = require('to-json-schema')
const R = require('rambdax')

module.exports = {
	get: R.map((val, prop) => toJsonSchema(prop), {
		'/': {everything: 'sound', another: {life: true, lover: false}}
	}),
	post: {},
	put: {},
	patch: {},
	delete: {}
}
