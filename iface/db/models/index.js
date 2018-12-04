const knex = require('knex')
const connection = require('^knexfile')
const {Model} = require('objection')

const knexConnection = knex(connection)

Model.knex(knexConnection)

// Example of ORM model import
const Users = require('./Users')

module.exports = {
	Users
}
