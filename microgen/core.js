/* eslint unicorn/regex-shorthand: 0 */

const R = require('rambdax')
const deeps = require('deeps')
const got = require('got')
const result = require('await-result')
const url = require('url-parse')
const config = require('config')
const rfdc = require('rfdc')({proto: true})

// Example of Adding another Shell Call
const dbCart = require('^shell/db/cart')

const pipelines = {}
pipelines['0.0.1'] = [sessionConstruction, checkUserHasCart]
//pipelines['1.5.0'] = R.flatten(R.append([persistCartWithUser], pipelines['1.0.0']))

const gotOptions = {
	json: true,
	headers: {}
}

function sessionConstruction({
	request,
	_cache = {},
	_out = {},
	..._passthrough
}) {
	// Example of rfdc (really fast deep clone) to assist with immutability
	const session = deeps.get(request, 'session')
	_cache.session = session ? rfdc(session) : {cart: {}}

	gotOptions.body = {}
	return {
		request,
		_out,
		_cache,
		..._passthrough
	}
}

async function checkUserHasCart({_out, _cache = {}, ..._passthrough}) {
	const debug = require('debug')('pipe:invoice@checkUserHasCart')
	// S === shorthand for session always
	const S = rfdc(_cache.session)

	// Check if cart is available in session for the user
	if (!deeps.get(S, 'cart.cart')) {
		// Check if cart is saved for the user
		// Note: dbCart module is in the Shell, this is not a violation of FC/IS
		_cache.dbRecord = await dbCart.getCustomerByUserID(S.user_id)

		if (_cache.dbRecord.foxycartCart) {
			S.foxycart = {
				cart: _cache.dbRecord.foxycartCart.id,
				customer: _cache.dbRecord.id,
				...S.foxycart
			}
		}
	}

	_cache.session = S
	debug('_out', _out)
	debug('_cache', _cache)
	return {
		_cache,
		_out,
		..._passthrough
	}
}

async function persistCartWithUser({
	storeURL = url(config.store.api, true),
	_cache,
	_out,
	..._passthrough
}) {
	const debug = require('debug')('pipe:invoice@persistCartWithUser')
	const S = rfdc(_cache.session)

	const gotMerge = {
		body: {
			language: 'english',
			locale_code: 'en_AU'
		}
	}

	// Note: Treat NOCK as a reserved word
	const pNock = result(
		// Note: got is technically an iface and as such could be abstracted to the iface folder. The decision to leave it here was due to the simplicity of the got module
		got.put(storeURL.toString(), {...gotOptions, ...gotMerge}),
		true
	)

	_cache.nock = R.pick(['statusCode', 'body'], await pNock)

	_cache.session = S
	debug('_out', _out)
	debug('_cache', _cache)
	return {
		_cache,
		_out,
		..._passthrough
	}
}

module.exports = pipelines
