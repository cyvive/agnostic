const R = require('rambdax')
const Skematic = require('skematic')
const latestSemVer = require('latest-semver')

// NOTE: https://github.com/mekanika/skematic for detailed information about how to use

const schemaVersions = {}

/* PlopInjection:Schema */
schemaVersions['0.1.0'] = {}

module.exports = version => {
	const schemaLatest = R.defaultTo(
		latestSemVer(R.keys(schemaVersions)),
		version
	)
	return {
		version: schemaLatest,
		schema: schemaVersions[schemaLatest]
	}
}
