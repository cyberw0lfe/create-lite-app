const { execSync } = require('child_process')

const execCmd = cmd => { // add args here too
  try {
    const child = execSync(cmd, [], { encoding: 'utf8' })
    if(child.error) console.log('ERROR: ', child.error)
    return child
  } catch(err) {
    console.log('ERROR executing command: ', err)
  }
}

module.exports = execCmd