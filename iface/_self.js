const R = require('rambdax')
const Skematic = require('skematic')
const latestSemVer = require('latest-semver')

// NOTE: https://github.com/mekanika/skematic for detailed information about how to use

const _selfVersions = {}

/* PlopInjection:_self */
_selfVersions['0.1.0'] = {}

module.exports = version => {
	const _selfLatest = R.defaultTo(latestSemVer(R.keys(_selfVersions)), version)
	return {
		version: _selfLatest,
		schema: {
			format: data => Skematic.format(_selfVersions[_selfLatest], data),
			validate: data => Skematic.validate(_selfVersions[_selfLatest], data)
		}
	}
}
