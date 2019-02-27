'use strict'

const pinoDebug = require('pino-debug')
const logger = require('pino')({level: process.env.LEVEL || 'info'})
global.config = require('config')

pinoDebug(logger, {
	auto: true,
	map: {
		'example:server': 'info',
		'pipe:*': 'debug',
		'*': 'trace'
	}
})

require('resquire')
require('make-promises-safe').abort = true

// TODO investigate 'resolve-from'

/* MRMInjection:Redis@Step1 */
const abcache = require('abstract-cache')({
	useAwait: false // Required for fastify-server-session to function correctly
	/* MRMInjection:Redis@Step2 */
})

const fastify = require('fastify')({logger: true})
const deeps = require('deeps')

fastify
	.register(require('fastify-cookie'))
	/* MRMInjection:Redis@Step3 */
	.register(require('fastify-caching'), {cache: abcache})
	/* MRMInjection:ServerSession@Step1 */
	.register(require('fastify-sensible'))
	.register(require('fastify-blipp'))
	.register(require('fastify-auth'))
	.decorate('permittedRouteSession', function(request, reply, done) {
		const role = deeps.get(request, 'session.role')
		if (role) {
			if (role === 'user') {
				done()
			} else {
				done(fastify.httpErrors.unauthorized('access level too low for route'))
			}
		} else {
			done(fastify.httpErrors.expectationFailed('session expired'))
		}
	})

// Routes
/* PlopInjection:routeName */

fastify.listen(3000, (err, address) => {
	if (err) {
		throw err
	}

	fastify.blipp()
	fastify.log.info(`server listening on ${address}`)
})
