#!/usr/bin/env node
const npm = require('./util/npm')
const logger = require('./util/logger')
const addScripts = require('./actions/addScripts')
const createSrcDir = require('./actions/createSrcDir')
const directoryCheck = require('./actions/directoryCheck')
const installDependencies = require('./actions/installDependencies')

const run = async () => {
  try {
    directoryCheck()
    await npm.init()
    await installDependencies()
    addScripts()
    createSrcDir()
    logger.log('App initialization complete!')
  } catch(err) {
    logger.error(err.message)
    logger.error('Ending process...')
    process.exit(1)
  }
  
}

run()
