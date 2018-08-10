const convert = require('csvtojson')

module.exports = path => convert().fromFile(path)
