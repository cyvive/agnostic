/* eslint unicorn/filename-case: 0 */
/* eslint camelcase: 0 */

const {Model} = require('./BaseModel')
const softDelete = require('objection-soft-delete')

module.exports = class Users extends softDelete({columnName: 'is_archived'})(
	Model
) {
	static get tableName() {
		return 'users'
	}

	/* Each model must have a column (or a set of columns) that uniquely
	 * identifies the rows. The colum(s) can be specified using the `idColumn`
	 * property. `idColumn` returns `id` by default and doesn't need to be
	 * specified unless the model's primary key is something else.
	 */
	// static get idColumn() {return 'id'}

	static get jsonSchema() {
		return {
			type: 'object',
			required: ['email'],

			properties: {
				id: {type: 'integer'},
				name_first: {type: 'string'},
				name_last: {type: 'string'},
				email: {format: 'email'},
				is_active: {type: 'boolean', default: false},
				is_archived: {type: 'boolean', default: false}
			}
		}
	}

	static get relationMappings() {
		return {
			clusters: {
				relation: Model.ManyToManyRelation,
				modelClass: `${__dirname}/Clusters`,
				join: {
					from: 'users.id',
					through: {
						from: 'owner_clusters.user_id',
						to: 'owner_clusters.cluster_id'
					},
					to: 'clusters.id'
				},
				filter: f => {
					f.whereNotDeleted()
				}
			},
			password: {
				relation: Model.HasOneRelation,
				modelClass: `${__dirname}/Passwords`,
				join: {
					from: 'users.id',
					to: 'passwords.user_id'
				}
			}
		}
	}
}
