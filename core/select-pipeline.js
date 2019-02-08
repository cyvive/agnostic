/* eslint unicorn/regex-shorthand: 0 */
require('resquire')

const R = require('rambdax')
const latestSemVer = require('latest-semver')
const isSemVer = require('is-semver')

module.exports = ({request, pipelines}) => {
	const pipeMajorVersion = 'v' + request.headers['accept-version'].split('.')[0]
	const pipeVersion = isSemVer(request.headers['accept-version'])
		? request.headers['accept-version']
		: latestSemVer(R.keys(pipelines[pipeMajorVersion]))

	return R.flatten([pipelines[pipeMajorVersion][pipeVersion]])
}
