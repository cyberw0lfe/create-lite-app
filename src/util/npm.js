const logger = require('./logger')

const baseConfig = {
  loglevel: 'silent',
  quiet: true
}

const execNpm = cmd => {
  const npm = require('npm')
  npm.load(baseConfig, err => {
    cmd(npm)
  })
}

const init = () => new Promise((resolve, reject) => {
  const cmd = npm => {
    logger.log('Initializing package...')
    npm.commands.init(() => {
      resolve()
    })  
  }

  execNpm(cmd)
})

module.exports = { init }
