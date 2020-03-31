const assert = require('assert')
const directoryCheck = require('../src/actions/directoryCheck')
const { dirNotEmptyError } = require('../src/resources/errors.json')

const testPath = './test/test-directories'

describe('Directory Check', () => {
  describe('Empty Directory', () => {
    it('Should not throw an error', () => {
      assert.doesNotThrow(
        () => directoryCheck(`${testPath}/emptyDir`),
        dirNotEmptyError.name
      )
    })
  })

  describe('Empty Git Directory', () => {
    it('Should not throw an error', () => {
      assert.doesNotThrow(
        () => directoryCheck(`${testPath}/emptyDir`),
        dirNotEmptyError.name
      )
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