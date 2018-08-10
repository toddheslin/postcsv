#!/usr/bin/env node

const toJson = require('../modules/csvtojson')
const request = require('../modules/request')
const responder = require('../modules/responder')
const { throttleFactory, throttle } = require('../modules/throttle')

const program = require('commander')

program
	.version('0.1.0', '-v, --version')
	.option('-i, --csv <path>')
	.option('-o, --url <url>')
	.option('-r, --rps <rps>')
	.parse(process.argv)

toJson(program.csv)
	.then(rows =>
		throttle({
			rows,
			promiseThrottle: throttleFactory(program.rps),
			request: request({ baseURL: program.url })
		})
	)
	.then(fns => Promise.all(fns.map(f => f())))
	.then(responder)
	.then(result => {
		const successes = result.filter(r => r.status === 200).length
		console.log(`Successfully uploaded ${successes} from ${result.length} attempts`)
	})
	.catch(console.error)
