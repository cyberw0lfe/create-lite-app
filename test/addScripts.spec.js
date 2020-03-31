const assert = require('assert')
const { writeFileSync } = require('fs')
const package = require('./package.json')

const addScripts = require('../src/actions/addScripts')
const scriptsJson = require('../src/resources/scripts.json')
const scripts = Object.keys(scriptsJson.npm)


const pkgContent = {
  "name": "test-package-json",
  "scripts": {
    "generic-script-one": "echo this is a test script"
  }
}

const restorePkg = () => {
  writeFileSync('./test/package.json', JSON.stringify(pkgContent, null, 2))
}

describe('Add NPM Scripts', () => {
  before(() => {
    addScripts(`${process.cwd()}/test`)
  })

  after(() => {
    restorePkg()
  })

  it(`Should add ${scripts.length} scripts to package.json`, () => {
    const scriptCount = Object.keys(package.scripts).length
    const expectedCount = scripts.length + 1
    assert.equal(scriptCount, expectedCount)
  })

  it('Should have all of the proper script names', () => {
    let scriptsPresent = true
    const scriptNames = Object.keys(package.scripts)
    
    scripts.forEach(script => {
      if(!scriptNames.includes(script)) {
        scriptsPresent = false
      }
    })
    assert(scriptsPresent)
  })

  it('Should have a precommit hook', () => {
    const huskyHooks = Object.keys(package.husky.hooks)
    assert(huskyHooks.includes('pre-commit'))
  })
})