const PromiseThrottle = require('promise-throttle')

const throttleFactory = rps =>
	new PromiseThrottle({
		requestsPerSecond: rps || 5, // up to 1 request per second
		promiseImplementation: Promise // the Promise library you are using
	})

const throttle = ({ promiseThrottle, rows, request }) =>
	rows.map(row => () => promiseThrottle.add(() => request.post(null, row)))

module.exports = {
	throttleFactory,
	throttle
}
