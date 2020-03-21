#!/usr/bin/env node

const { mkdirSync, writeFileSync } = require('fs')
const npm = require('./util/npm')
const logger = require('./util/logger')
const exec = require('./util/exec')
const dependencies = require('./resources/dependencies.json')
const scripts = require('./resources/scripts.json')
const pathMap = require('./resources/pathMap')
const templates = require('./resources/file-templates')

const installDependencies = async () => {
  await npm.install(dependencies.base, false)
  
  const lintDeps = await npm.lintDeps()
  const devDeps = dependencies.baseDev.concat(lintDeps)
  const installString = `npm install --save-dev ${devDeps.join(' ')}`
  logger.log('Installing dev dependencies...')
  await exec(installString)
}

const addScripts = () => {
  logger.log('Adding scripts to package.json...')
  const package = require(`${process.cwd()}/package.json`)
  Object.keys(scripts).forEach(script => 
    package.scripts[script] = scripts[script])
  writeFileSync('./package.json', JSON.stringify(package, null, 2))
}

const createSrcDir = () => {
  logger.log('Creating src directory...')
  mkdirSync('./src')
  mkdirSync('./src/components')
  Object.keys(pathMap).forEach(template => writeFileSync(pathMap[template], templates[template]))
}

const run = async () => {
  await npm.init()
  await installDependencies()
  addScripts()
  createSrcDir()
  logger.log('App initialization complete!')
}

run()
