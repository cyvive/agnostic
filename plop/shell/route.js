const schema = require(__filename.replace('.js', '.schema.js'))
// Database Model(s) Require
// const {Users} = require('^iface/db/models/index')

// Core Algorithm Require
const {{ verb }} = require('^core/{{ name }}/{{ verb }}/index')

module.exports = async (fastify, options) => {
	fastify
		.addHook('preHandler', fastify.auth([fastify.permittedRouteSession]))
		.route({
			version: '{{ verMajor }}.{{ verMinor }}.0',
			url: '/{{ route }}',
			schema: schema.{{ verb }}['/'],
			method: '{{ constantCase verb }}',
			handler: async request => {
				/* Database Model(s) example
				return Users.query()
					.where('id', request.session.user_id)
					.eager('[clusters]')
				*/
				return {{ verb }}({request})
			}
		})
}
