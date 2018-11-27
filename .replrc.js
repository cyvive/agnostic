module.exports = {
	context: {
		_: require('lodash'),
		models: require('./models'),
		dayjs: require('dayjs'),
		iron: require('iron'),
		_pwMagic: require('password-magic'),
		R: require('rambdax')
	},
	enableAwait: true
}
