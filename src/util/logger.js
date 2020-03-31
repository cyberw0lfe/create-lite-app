const { green, yellow, red } = require('chalk')

module.exports = {
  log: (message) => console.log(green(message)),
  warn: (message) => console.log(yellow(message)),
  error: (message) => console.log(red(message))
}