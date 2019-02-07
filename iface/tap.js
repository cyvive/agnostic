'use strict'

require('resquire')
require('make-promises-safe').abort = true

switch (process.env.NODE_ENV) {
	case 'ci':
	case 'production':
		break
	default:
		process.env.TAP = true
}

const otherName = fileName =>
	[
		'.',
		require('upath').basename(fileName.replace(/\.(spec|sanity|api)/, ''))
	].join('/')

function reset(fileName) {
	const loadFile = otherName(fileName)
	require('clear-require')(loadFile)
	return require(loadFile)
}

module.exports = function(fileName) {
	return {
		describe: require('muggle-test'),
		isInstalled: require('is-installed'),
		td: require('testdouble'),
		otherName: otherName(fileName)
	}
}
