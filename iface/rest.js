const stampit = require('@stamp/it')
const compareVersions = require('semver-compare')
const R = require('rambdax')
// TODO jxon + (non-streaming requests) for xml compatibility
const jxon = require('jxon')

function walkConfig({version, api}) {
	const apiVersions = R.path(`rest.${api}`, config)
	const versions = R.keys(apiVersions).sort(compareVersions)

	// Map to latest compatibility automatically without supplied version
	if (!version) version = R.last(versions)

	let apiConfig = apiVersions[R.head(versions)]
	for (var i = 1, len = versions.length; i < len; i++) {
		const verKey = versions[i]
		if (compareVersions(verKey, version) === 1) break
		apiConfig = R.mergeDeep(apiConfig, apiVersions[verKey])
	}

	return apiConfig
}

const apiSettings = stampit()
	.statics({
		selfConf(options) {
			return this.deepConf({...options})
		}
	})
	.init([
		function({api, version}, {stamp}) {
			this.deepConf = {got: walkConfig({api, version})}
		}
	])

const gotStamp = stampit(apiSettings)
	.statics({
		async got(url = this.compose.deepConfiguration.url) {
			const Emittery = require('emittery')
			const {got} = this.compose.deepConfiguration
			if (!this.emittery) {
				this.emittery = new Emittery()
			}
			return require('got')(url, {...got})
		},
		rest(options) {
			return this.selfGot(options)
		},
		selfGot(options) {
			return this.deepConf({got: {...options}})
		},
		url(url) {
			return this.selfConf({url})
		}
	})
	.deepConf({
		got: {
			stream: true
		}
	})

const readStream = stampit(gotStamp).statics({
	async read(pipes) {
		const Asm = require('stream-json/Assembler')
		const parser = require('stream-json')
		const {chain} = require('stream-chain')

		if (this.got) {
			this.selfGot({method: 'GET'})
			if (!this.stream) {
				this.stream = this.got()
			}
		}

		const stream = await this.stream
		// Mirror a raw pipline
		const rawAsm = new Asm()
		rawAsm.connectTo(chain([stream, parser()]))
		rawAsm.on('done', asm => this.emittery.emit('raw', asm.current))
		rawAsm.on('end', () => this.emittery.emit('end'))

		// Handle empty request
		if (!pipes) return this.emittery

		// Wrap in array if necessary
		if (!require('util').isArray(pipes)) pipes = [pipes]

		pipes.forEach(pipe => {
			const pipeName = R.head(R.keys(pipe))
			const piping = [stream, parser()]
			let arrayStream
			R.path(pipeName, pipe).forEach(iteration => {
				const {type, filter, isArray} = R.head(R.path(pipeName, pipe))
				if (type) {
					piping.push(
						type === 'pick'
							? require('stream-json/filters/Pick').pick({filter})
							: require('stream-json/filters/Filter').filter({filter})
					)
				}

				if (isArray) {
					arrayStream = true
					piping.push(
						require('stream-json/streamers/StreamArray').streamArray()
					)
				}
			})
			const pipeline = chain(R.flatten(piping))
			if (arrayStream)
				pipeline.on('data', data => this.emittery.emit(pipeName, data))
			else {
				// Only use if not using one of the streamers
				const asm = new Asm()
				asm.connectTo(pipeline)
				asm.on('done', asm => this.emittery.emit(pipeName, asm.current))
			}
		})
		return this.emittery
	}
})

module.exports = ({api, version}) => readStream.rest(walkConfig({api, version}))
