const logger = require('./logger')

const baseConfig = {
  loglevel: 'silent',
  progress: true
}

const execNpm = cmd => {
  const npm = require('npm')
  npm.load(baseConfig, err => {
    cmd(npm)
  })
}

// BROKEN -- once npm.load is called once, you can't load again
const execNpmDev = cmd => {
  const npm = require('npm')
  npm.load({ ...baseConfig, 'save-dev': true }, err => {
    cmd(npm)
  })
}

const install = (dep, isDev) => new Promise((resolve, reject) => {
  const cmd = npm => {
    const devString = isDev ? 'dev ' : ''
    logger.log(`Installing ${devString}dependencies...`)
    npm.commands.install(dep, (err, data) => {
      resolve()
    })
  }
  
  isDev 
    ? execNpmDev(cmd) 
    : execNpm(cmd)
})

const init = () => new Promise((resolve, reject) => {
  const cmd = npm => {
    logger.log('Initializing package...')
    npm.commands.init(() => {
      resolve()
    })  
  }

  execNpm(cmd)
})

const lintDeps = () => new Promise((resolve, reject) => {
  const cmd = npm => {
    npm.commands.info(['eslint-config-airbnb@latest', 'peerDependencies'], (err, data) => {
      const depObj = data[Object.keys(data)[0]].peerDependencies
      const versionRegex = /\^[0-9]+.[0-9]+.[0-9]+/
      const lintDeps = Object.keys(depObj).map(dep => {
        const version = depObj[dep].match(versionRegex)
        return `${dep}@${version}`
      })
      resolve(lintDeps)
    })
  }

  execNpm(cmd)
})

module.exports = { init, install, lintDeps }
