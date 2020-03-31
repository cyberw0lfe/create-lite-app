const exec = require('../util/exec')
const npm = require('../util/npm')
const logger = require('../util/logger')
const dependencies = require('../resources/dependencies.json')

module.exports = async () => {
  await npm.install(dependencies.base, false)
    
  const lintDeps = await npm.lintDeps()
  const devDeps = dependencies.baseDev.concat(lintDeps)
  const installString = `npm install --save-dev ${devDeps.join(' ')}`
  logger.log('Installing dev dependencies...')
  await exec(installString)
}