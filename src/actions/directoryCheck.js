const { readdirSync } = require('fs')
const { dirNotEmptyError } = require('../resources/errors')

const ignoreFiles = [ '.git', '.gitignore' ]
const checkFile = file => !ignoreFiles.includes(file)

module.exports = (path = './') => {
  const files = readdirSync(path).filter(checkFile)
  if(files.length > 0) {
    throw dirNotEmptyError
  }
}
