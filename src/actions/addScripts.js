const { writeFileSync } = require('fs')
const scripts = require('../resources/scripts.json')
const logger = require('../util/logger')

module.exports = (path = process.cwd()) => {
  logger.log('Adding scripts to package.json...')
  const package = require(`${path}/package.json`)
  
  // add npm scripts
  const npmScripts = scripts.npm
  Object.keys(npmScripts).forEach(script => 
    package.scripts[script] = npmScripts[script])

  // add pre-commit script
  package['husky'] = scripts.husky

  writeFileSync(`${path}/package.json`, JSON.stringify(package, null, 2))
}