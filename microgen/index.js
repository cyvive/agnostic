/* eslint unicorn/regex-shorthand: 0 */
const R = require('rambdax')
const core = require('^core/index')
const rfdc = require('rfdc')({proto: true})
const latestSemVer = require('latest-semver')
const isSemVer = require('is-semver')

let pipeMajorVersion
let pipeVersion

// Pipeline Definition / Import
const pipelines = {}
let pipeline = []
/* eslint dot-notation: 0 */
pipelines['v0'] = require('./v0')

function _selectPipeline({request, pipelines, ..._passthrough}) {
	pipeMajorVersion = 'v' + request.headers['accept-version'].split('.')[0]
	pipeVersion = isSemVer(request.headers['accept-version'])
		? request.headers['accept-version']
		: latestSemVer(R.keys(pipelines[pipeMajorVersion]))
	pipeline = R.flatten([_init, pipelines[pipeMajorVersion][pipeVersion], _end])

	return {
		request,
		..._passthrough
	}
}

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
	data.pipelines = pipelines
	const passthrough = _selectPipeline(data)
	return core
		.pPipe(...pipeline)(passthrough)
		.catch(core.remotelog('error'))
}
