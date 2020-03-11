#!/usr/bin/env node

const npm = require('npm')
const { execSync, exec, spawnSync, spawn } = require('child_process')

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
    const { name } = require(`${process.cwd()}/package.json`)
    execCmd(`mkdir ${name}`)
    execCmd(`mv package.json ${name}`)
    // npm.commands.install(['parcel-bundler'], (err, data) => {
    //   if(err) console.log('INSTALL ERROR: ', err)
    //   console.log(data)
    // })
    execCmd(`cd ${name}; npm install parcel-bundler`)
  })
})
