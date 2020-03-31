const assert = require('assert')
const { existsSync } = require('fs')
const createSrcDir = require('../src/actions/createSrcDir')

describe('Create src Directory', () => {
  before(() => {
    createSrcDir(`${process.cwd()}/test`)
  })

  after(() => {
    // rm -rf src .eslintrc.yml README.md
  })

  it('Should have a readme', () => assert(existsSync('./test/README.md')))

  it('Should have an .eslintrc', () => assert(existsSync('./test/.eslintrc')))
  
  it('Should have a src directory', () => assert(existsSync('./test/src')))
  
  it('Should have index and app files', () => {
    assert(existsSync('./test/src/index.html'))
    assert(existsSync('./test/src/index.js'))
    assert(existsSync('./test/src/App.js'))
  })
})