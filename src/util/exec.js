const { exec } = require('child_process')
const logger = require('./logger')

const execCmd = cmd => new Promise((resolve, reject) => {
  exec(cmd, (err, stdout, stderr) => {
    if(err) logger.error(err)
    resolve()
  })
})

module.exports = execCmd