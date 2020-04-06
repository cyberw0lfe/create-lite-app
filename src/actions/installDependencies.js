const exec = require('../util/exec')
const logger = require('../util/logger')
const dependencies = require('../resources/dependencies.json')

const getLintDepVersion = (string) => {
  const versionRegex = /\^[0-9]+.[0-9]+.[0-9]+/g
  const versions = string.match(versionRegex)
  if(versions.length === 1) return versions[0]
  const v1 = versions[0]
  const v2 = versions[1]
  return v1[1] > v2[1] ? v1 : v2
}

const parseLintDeps = (depString) => {
  return depString.split('\n').map(string => {
    if(string.includes(':')){
      const split = string.split(':')
      const dep = split[0].trim().replace(/'/g, '')
      const version = getLintDepVersion(split[1])
      return `${dep}@${version}`
    }
  }).filter(dep => dep)
}

const installNpm = async (devDeps) => {
  logger.log('Installing dependencies with npm...')
  await exec(`npm install ${dependencies.base.join(' ')}`)
  logger.log('Installing dev dependencies with npm...')
  await exec(`npm install --save-dev ${devDeps.join(' ')}`)
}

const installYarn = async (devDeps) => {
  logger.log('Installing dependencies with yarn...')
  await exec(`yarn add ${dependencies.base.join(' ')}`)
  logger.log('Installing dev dependencies with yarn...')
  await exec(`yarn add --dev ${devDeps.join(' ')}`)
}

module.exports = async (pkgMgr) => {
  const output = await exec('npm info eslint-config-airbnb@latest peerDependencies')
  const lintDeps = parseLintDeps(output)
  const devDeps = dependencies.baseDev.concat(lintDeps)

  pkgMgr === 'yarn'
    ? await installYarn(devDeps)
    : await installNpm(devDeps)
}