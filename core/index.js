const remotelog = partial((level, msg) => {
	console[level](msg)
})

function partial(fn, ...cache) {
	return (...args) => {
		const all = cache.concat(args)
		return all.length >= fn.length ? fn(...all) : partial(fn, ...all)
	}
}

function pPipe(...fns) {
	const start = fns.shift()
	return (...args) =>
		fns.reduce(chain, new Promise(resolve => resolve(start(...args))))
}

function chain(q, fn) {
	/* eslint promise/prefer-await-to-then: 0 */
	return q.then(fn)
}

/* TODO wire this logging up
function RemoteLogConstructed(level) {
	this.level = level
	this.log = msg => console[this.level](msg)
}
*/

module.exports = {pPipe, remotelog}
