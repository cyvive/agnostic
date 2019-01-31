/* eslint unicorn/regex-shorthand: 0 */

const R = require('rambdax')
const deeps = require('deeps')
const got = require('got')
const result = require('await-result')
const url = require('url-parse')
const core = require('^core/index')
const config = require('config')
const rfdc = require('rfdc')({proto: true})

// Example of Adding another Shell Call
//const dbCart = require('^shell/db/cart')

var pipelines = {}
pipelines['0.1.0'] = [publish_hello]

const gotOptions = {
	json: true,
	headers: {}
}

function publish_hello({request, _cache = {}, _out = {}, ..._passthrough}) {
	_out.methodname = 'publish_hello'
	return {
		request,
		_out,
		_cache,
		..._passthrough
	}
}

module.exports = pipelines
