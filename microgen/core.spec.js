require('resquire')

const rewire = require('rewire')
const faker = require('faker')
const {describe, td, otherName} = require('^tap')(__filename)
const url = require('url-parse')
const jsonPatch = require('fast-json-patch')
const rfdc = require('rfdc')({proto: true})
const nock = require('nock')

const db = td.replace('^shell/db/cart')
const o = rewire(__filename.replace('.spec', ''))

describe('pipeline', async t => {
	// Testing a pipeline, make life easier by flowing the data through it
	let data = {
		request: {
			session: {
				user_id: faker.random.number()
			}
		},
		reply: {}
	}
	const dataWatcher = jsonPatch.observe(data)

	await t.test('sessionConstruction', async t => {
		data = o.__get__('sessionConstruction')(data)
		const delta = jsonPatch.generate(dataWatcher)
		t.deepEqual(
			delta.shift(),
			{op: 'add', path: '/request/session/foxycart', value: {}},
			'request, session, cart are all created empty'
		)
		t.equal(delta.length, 0, 'all delta records checked')
	})

	await t.test('persistCartWithUser', async t => {
		const dataReturn = {
			template_set_uri: '',
			language: 'english',
			locale_code: 'en_AU',
			date_created: faker.date.past(),
			date_modified: faker.date.recent()
		}
		const {storeURL} = data
		nock(storeURL.origin)
			.post(/carts\/\d.+$/)
			.reply(200, dataReturn)

		data._cache.cartID = faker.random.number()
		const pData = o.__get__('persistCartWithUser')(data)
		data = await pData
		const delta = jsonPatch.generate(dataWatcher)
		const {boundCartUser} = data._cache
		t.equal(boundCartUser.statusCode, 200, 'server reports correct status code')
		t.equal(delta.length, 0, 'all delta records checked')
	})

	td.reset()
})
