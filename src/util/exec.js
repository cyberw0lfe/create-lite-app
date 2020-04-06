const cp = require('child_process')
const logger = require('./logger')

const exec = cmd => new Promise((resolve, reject) => {
  cp.exec(cmd, (err, stdout, stderr) => {
    if(err) logger.error(err)
    resolve(stdout)
  })
})

module.exports = exec