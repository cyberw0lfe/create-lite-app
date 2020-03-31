const { mkdirSync, writeFileSync } = require('fs')
const logger = require('../util/logger')
const pathMap = require('../resources/pathMap')
const templates = require('../resources/file-templates')

module.exports = (path = process.cwd()) => {
  logger.log('Creating src directory...')
  mkdirSync(`${path}/src`)
  mkdirSync(`${path}/src/components`)
  Object.keys(pathMap).forEach(template => writeFileSync(`${path}/${pathMap[template]}`, templates[template]))
}
