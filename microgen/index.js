/* eslint unicorn/regex-shorthand: 0 */
const R = require('rambdax')
const core = require('^core/index')
const isSemVer = require('is-semver')
const latestSemVer = require('latest-semver')
const rfdc = require('rfdc')({proto: true})

// Pipeline Definition / Import
const pipelines = {}
pipelines.v0 = require('./v0')

function _init({request, _cache = {}, _out = {}, ..._passthrough}) {
	// Init code shared through version
	return {
		request,
		_out,
		_cache,
		..._passthrough
	}
}

function _end({request, _out, _cache}) {
	request.session = rfdc(_cache.session)
	return rfdc(_out)
}

module.exports = data => {
	const {request} = data
	const pipeline = R.flatten([
		_init,
		require('^core/select-pipeline')({request, pipelines}),
		_end
	])
	return core
		.pPipe(...pipeline)(data)
		.catch(core.remotelog('error'))
}
