const { green, yellow, red } = require('chalk')

module.exports = {
  log: (message) => green(console.log(message)),
  warn: (message) => yellow(console.log(message)),
  error: (message) => red(console.log(message))
}