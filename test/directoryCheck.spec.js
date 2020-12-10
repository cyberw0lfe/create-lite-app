const assert = require('assert')
const fs = require('fs')
const directoryCheck = require('../src/actions/directoryCheck')
const { dirNotEmptyError } = require('../src/resources/errors.json')

const testPath = './test/test-directories'

describe('Directory Check', () => {
  describe('Empty Directory', () => {
    it('Should not throw an error', () => {
      fs.mkdirSync(`${testPath}/emptyDir`)
      assert.doesNotThrow(
        () => directoryCheck(`${testPath}/emptyDir`),
        dirNotEmptyError.name
      )
      fs.rmdirSync(`${testPath}/emptyDir`)
    })
  })

  describe('Empty Git Directory', () => {
    it('Should not throw an error', () => {
      fs.mkdirSync(`${testPath}/emptyDir`)
      assert.doesNotThrow(
        () => directoryCheck(`${testPath}/emptyDir`),
        dirNotEmptyError.name
      )
      fs.rmdirSync(`${testPath}/emptyDir`)
    })
  })
  
  describe('Non-Empty Directory', () => {
    it('Should throw a nonEmptyDir error', () => {
      assert.throws(
        ()=> directoryCheck('nonEmptyDir'),
        dirNotEmptyError.name
      )
    })
  })
  
  describe('Non-Empty Git Directory', () => {
    it('Should throw a nonEmptyDir error', () => {
      assert.throws(
      () => directoryCheck('nonEmptyDir'),
        dirNotEmptyError.name
      )
    })
  })
})