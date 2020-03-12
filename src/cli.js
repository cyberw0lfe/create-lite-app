#!/usr/bin/env node

const npm = require('npm')
const { execSync } = require('child_process')
const fs = require('fs')
const { green } = require('chalk')
const dependencies = require('./dependencies.json')
const scripts = require('./scripts.json')
const templates = require('./file-templates')

const log = string => green(console.log(string))

const execCmd = cmd => { // add args here too
  // const child = spawnSync(cmd, [], { encoding: 'utf8' })
  try {
    const child = execSync(cmd, [], { encoding: 'utf8' })
    if(child.error) console.log('ERROR: ', child.error)
    return child
  } catch(err) {
    console.log('ERROR executing command: ', err)
  }
}

npm.load({
  loaded: false,
}, async err => {
  npm.commands.init(() => {
    log('Installing dependencies...')
    npm.commands.install(dependencies.base, (err, data) => {
      if(err) console.log('INSTALL ERROR: ', err)
    })

    npm.load({
      loaded: false,
      'save-dev': true // this doesn't work
    }, err => {
      npm.commands.install(dependencies.baseDev)
    })

    log('Adding parcel scripts to package.json...')
    const package = require(`${process.cwd()}/package.json`)
    Object.keys(scripts).forEach(script => package.scripts[script] = scripts[script])
    fs.writeFile('./package.json', JSON.stringify(package))
  })
})

log('Creating src directory...')
execCmd('mkdir src')
execCmd('touch src/index.html src/index.js src/App.js')
fs.appendFile('./src/index.html', templates.indexHtml)
fs.appendFile('./src/index.js', templates.indexJs)
fs.appendFile('./src/App.js', templates.app)
