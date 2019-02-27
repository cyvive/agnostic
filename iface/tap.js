'use strict'

require('resquire')
require('make-promises-safe').abort = true

const R = require('rambdax')
const describe = require('muggle-test')
const jsonPatch = require('rfc6902')
const rfdc = require('rfdc')({proto: true})
const {equal} = require('muggle-assert')

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

async function verifyDataMutation({_function, rewire, data, patches}) {
	const debug = require('debug')('verifyDataMutation')
	// Extract function and capture output value
	const extractedFunction = rewire.__get__(_function)
	const pDataReturn = extractedFunction(data)
	const delta = jsonPatch.createPatch(data, await pDataReturn)
	debug(_function)
	debug(delta)

	// Validate business logic / data manipulation by walking the patch
	// << LOOP BROKEN?
	for (let i = 0; i < patches.length; i++) {
		const {patch, msg} = patches[i]
		equal(delta.shift(), patch, msg)
	}

	// Ensure all patches have been checked
	equal(delta.length, 0, 'all delta records checked')

	const retObject = {dataReturn: rfdc(pDataReturn)}
	retObject[`${_function}`] = extractedFunction
	return retObject
}

module.exports = function(fileName) {
	return {
		describe,
		isInstalled: require('is-installed'),
		otherName: otherName(fileName),
		td: require('testdouble'),
		verifyDataMutation
	}
}
