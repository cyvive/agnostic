const R = require('rambdax')
const Skematic = require('skematic')
const compareVersions = require('semver-compare')
const latestSemVer = require('latest-semver')

// NOTE: https://github.com/mekanika/skematic for detailed information about how to use

const _selfVersions = {}

/* PlopInjection:_self */
_selfVersions['0.1.0'] = {}

function versionList({version = null, direction} = {version: null}) {
	const trans = R.path('transformations', direction)
	const index = R.findIndex(transform => {
		return compareVersions(transform.version, version) <= 0
	}, trans)
	return index >= 0 ? trans.slice(index) : trans
}

function highestCompatible({direction, version}) {
	const sortedBridges = R.keys(direction.bridgeMapping).sort(compareVersions)
	const bridgeVersion = (version
		? R.find(bridge => compareVersions(bridge, version) <= 0, sortedBridges)
		: sortedBridges.slice(-1))[0]
	return direction.bridgeMapping[bridgeVersion]
}

async function result({version, data, direction}) {
	const createMapper = require('map-factory')
	const mapper = createMapper()
	const compatibleVersion = highestCompatible({direction, version})
	R.map(
		versionMap => versionMap.mapping(mapper),
		versionList({version: compatibleVersion, direction})
	)
	return mapper.executeAsync(data)
}

module.exports = {
	_selfHelp: {versionList, highestCompatible, result},
	schema: ({version} = {}) => {
		const _selfLatest = R.defaultTo(
			latestSemVer(R.keys(_selfVersions)),
			version
		)
		return {
			version: _selfLatest,
			format: data => Skematic.format(_selfVersions[_selfLatest], data),
			validate: data => Skematic.validate(_selfVersions[_selfLatest], data)
		}
	}
}
