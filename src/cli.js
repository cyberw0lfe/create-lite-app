#!/usr/bin/env node

const npm = require('npm')
const { execSync } = require('child_process')
const { green } = require('chalk')
const dependencies = require('./dependencies.json')

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
  loaded: false
}, async err => {
  npm.commands.init(() => {
    log('Installing dependencies...')
    npm.commands.install(dependencies.base, (err, data) => {
      if(err) console.log('INSTALL ERROR: ', err)
    })

    log('Creating src directory...')
    execCmd('mkdir src')

    log('Adding parcel scripts to package.json...')
    const package = require(`${process.cwd()}/package.json`)
  })
})
