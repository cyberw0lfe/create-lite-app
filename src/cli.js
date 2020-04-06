#!/usr/bin/env node
const inquirer = require('inquirer')
const npm = require('./util/npm')
const logger = require('./util/logger')
const addScripts = require('./actions/addScripts')
const createSrcDir = require('./actions/createSrcDir')
const directoryCheck = require('./actions/directoryCheck')
const installDependencies = require('./actions/installDependencies')

const prompts = [
  {
    type: 'list',
    name: 'pkgMgr',
    message: 'npm or yarn?',
    choices: [ 'npm', 'yarn' ]
  }
]

const run = async () => {
  try {
    directoryCheck()
    const { pkgMgr } = await inquirer.prompt(prompts)
    await npm.init()
    addScripts()
    createSrcDir()
    await installDependencies(pkgMgr)
    logger.log('App initialization complete!')
  } catch(err) {
    logger.error(err.message)
    logger.error('Ending process...')
    process.exit(1)
  }
  
}

run()
