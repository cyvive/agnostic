const pg = require('pg')
const config = require('config')
pg.defaults.ssl = true

module.exports = {
	client: 'pg',
	connection: config.db,
	migrations: {
		directory: './iface/db/migrations'
	},
	seeds: {
		directory: './iface/db/seeds'
	}
}
