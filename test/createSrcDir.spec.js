const assert = require('assert')
const { existsSync } = require('fs')
const exec = require('../src/util/exec')
const createSrcDir = require('../src/actions/createSrcDir')

describe('Create src Directory', () => {
  before(() => {
    createSrcDir(`${process.cwd()}/test`)
  })

  after(() => {
    exec('rm -rf test/src test/.eslintrc.yml test/.babelrc test/README.md')
  })

  it('Should have a readme', () => assert(existsSync('./test/README.md')))

  it('Should have an .eslintrc', () => assert(existsSync('./test/.eslintrc.yml')))

  it('Should have an .babelrc', () => assert(existsSync('./test/.babelrc')))
  
  it('Should have a src directory', () => assert(existsSync('./test/src')))
  
  it('Should have index and app files', () => {
    assert(existsSync('./test/src/index.html'))
    assert(existsSync('./test/src/index.js'))
    assert(existsSync('./test/src/App.jsx'))
  })

  it('Should have a test directory', () => assert(existsSync('./test/src/test')))
  
  it('Should have a test file', () => assert(existsSync('./test/src/test/Component.test.js')))
})