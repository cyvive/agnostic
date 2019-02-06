/* eslint unicorn/regex-shorthand: 0 */
require('resquire')

const R = require('rambdax')
const core = require('^core/index')
const rfdc = require('rfdc')({proto: true})
const latestSemVer = require('latest-semver')
const isSemVer = require('is-semver')
var pipeMajorVersion
var pipeVersion

const pipelines = {}
pipelines['v0'] = require('./v0')
let pipeline = []

function _init({request, _cache = {}, _out = {}, ..._passthrough}) {
	pipeMajorVersion = 'v' + request.headers['accept-version'].split('.')[0]
	pipeVersion = isSemVer(request.headers['accept-version'])
		? request.headers['accept-version']
		: latestSemVer(R.keys(pipelines[pipeMajorVersion]))
		pipeline = R.flatten([
			pipelines[pipeMajorVersion][pipeVersion],
			_end])

	return {
		request,
		_out,
		_cache,
		..._passthrough
	}
}

function _end({request, _out, _cache}) {
	//request.session = rfdc(_cache.session)
	_out.hello = "World"
	return rfdc(_out)
}


//module.exports = pipelines
module.exports = data => {
	const redux = _init(data)
	return core
		.pPipe(...pipeline)(redux)
		.catch(core.remotelog('error'))
}
