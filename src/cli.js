#!/usr/bin/env node

const fs = require('fs')
const npm = require('./util/npm')
const execCmd = require('./util/execCmd')
const logger = require('./util/logger')
const dependencies = require('./resources/dependencies.json')
const scripts = require('./resources/scripts.json')
const templates = require('./resources/file-templates')

const addParcelScripts = () => {
  logger.log('Adding parcel scripts to package.json...')
  const package = require(`${process.cwd()}/package.json`)
  Object.keys(scripts).forEach(script => 
    package.scripts[script] = scripts[script])
  fs.writeFile('./package.json', JSON.stringify(package, null, 2))
}

const createSrcDir = () => {
  logger.log('Creating src directory...')
  execCmd('mkdir src')
  execCmd('touch src/index.html src/index.js src/App.js')
  fs.appendFile('./src/index.html', templates.indexHtml)
  fs.appendFile('./src/index.js', templates.indexJs)
  fs.appendFile('./src/App.js', templates.app)
  fs.appendFile('./src/Component.jsx', templates.component)
}

const run = async () => {
  await npm.init()
  await npm.installDep(dependencies.base)
  
  // calling execCmd because calling npm.load twice
  // for normal and dev dependencies doesn't work
  logger.log('Installing dev dependencies...')
  execCmd(`npm install ${dependencies.baseDev.join(' ')} --save-dev`)
  
  addParcelScripts()
  createSrcDir()

  logger.log('App initialization complete!')
}

run()