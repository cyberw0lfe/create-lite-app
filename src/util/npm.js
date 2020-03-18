const npm = require('npm')
const logger = require('./logger')

const init = () => new Promise((resolve, reject) => npm.load({
}, err => {
  logger.log('Initializing package...')
  npm.commands.init(() => {
    resolve()
  })
}))

const installDep = dep => new Promise((resolve, reject) => npm.load({
}, err => {
  logger.log('Installing dependencies...')
  npm.commands.install(dep, (err, data) => {
    resolve()
  })
}))

const installDevDep = dep => new Promise((resolve, reject) => npm.load({
  'save-dev': true
}, err => {
  npm.commands.install(dep, (err, data) => {
    resolve()
  })
}))

module.exports = { init, installDep, installDevDep }