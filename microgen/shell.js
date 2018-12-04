const schema = require(__filename.replace('.js', '.schema.js'))
// Database Model(s) Require
// const {Users} = require('^iface/db/models/index')

// Core Algorithm Require
// const getUser = require('^core/user')

module.exports = async (fastify, options) => {
	fastify
		.addHook('preHandler', fastify.auth([fastify.permittedRouteSession]))
		.route({
			version: '1.0.0',
			url: '/user',
			schema: schema.get['/'],
			method: 'GET',
			handler: async request => {
				/* Database Model(s) example
				return Users.query()
					.where('id', request.session.user_id)
					.eager('[clusters]')
				*/
				/* Core Algorithm Example
				return getUser({request})
				 */
			}
		})
}
