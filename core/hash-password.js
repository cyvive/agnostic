const {pbkdf2} = require('pbkdf2')
const {promisify} = require('util')
const _pwMagic = require('password-magic')
const R = require('rambdax')

const genHash = promisify(pbkdf2)

/* Careful example of fast computation involving Async / Await
 * Inspiration taken from: https://techbrij.com/javascript-async-await-parallel-sequence
 * 'The above is same and executes all three in parallel. So make a point, if you use await doJob(1,1) then it happens sequential if you assign it to a variable and then await the variable then it executes in parallel.'
 */

module.exports = async (data = {}) => {
	const {password, salt} = data
	const pUsedSalt = salt ? salt : _pwMagic.token(32)
	const pUsedPassword = password ? password : _pwMagic.humanShort()

	// Create Hash
	const pHashPassword = genHash(
		await pUsedPassword,
		await pUsedSalt,
		100000,
		64,
		'sha512'
	)

	return R.resolve({
		hash: (await pHashPassword).toString('hex'),
		salt: pUsedSalt,
		usedPassword: pUsedPassword
	})
}
