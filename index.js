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

const Redis = require('ioredis')

const redis = new Redis(global.config.redis)
const abcache = require('abstract-cache')({
	useAwait: false, // Required for fastify-server-session to function correctly
	driver: {
		name: 'abstract-cache-redis',
		options: {client: redis}
	}
})

const fastify = require('fastify')({logger: true})
const deeps = require('deeps')

fastify
	.register(require('fastify-cookie'))
	.register(require('fastify-redis'), {client: redis})
	.register(require('fastify-caching'), {cache: abcache})
	.register(require('fastify-server-session'), {
		secretKey: config.session.secret,
		sessionMaxAge: config.session.maxAge
	})
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

	fastify.blipp().log.info(`server listening on ${address}`)
})
