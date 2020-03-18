const { execSync } = require('child_process')

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

module.exports = execCmd