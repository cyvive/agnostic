'use strict'
global.config = require('config')

module.exports = function(plop) {
	plop.setWelcomeMessage('Scaffold out a new…')
	plop.setGenerator('route (endpoint)', require('./plop/generators/new/route'))
	plop.setGenerator(
		'rest API (external)',
		require('./plop/generators/new/rest')
	)
}
