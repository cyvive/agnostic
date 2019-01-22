/* eslint unicorn/regex-shorthand: 0 */
require('resquire')

const R = require('rambdax')
const core = require('^core/index')
const rfdc = require('rfdc')({proto: true})
const latestSemVer = require('latest-semver')
const isSemVer = require('is-semver')

let pipeVersion
let pipeMajorVersion

function _init({request, _cache = {}, _out = {}, ..._passthrough}) {
	pipeMajorVersion = 'v' + request.headers['accept-version'].substr(1)
	pipeVersion = isSemVer(request.headers['accept-version'])
		? request.headers['accept-version']
		: latestSemVer(R.keys(pipelines[pipeMajorVersion]))

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

//const pipeline = [_init, world, _end]
const pipelines = {}
const pipelines['v0'] = require('./v0')
const pipeline = R.flatten([
	_init,
	pipelines[pipeMajorVersion][pipeVersion],
	_end
])

//module.exports = pipeline
module.exports = data =>
	core
		.pPipe(...pipeline)(data)
		.catch(core.remotelog('error'))
