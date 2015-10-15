/* globals describe, it */

'use strict'

const ROOT_PATH = 'http://www.chezman.com'
const expect = require('chai').expect
const elbert = require('../index.js')({
  rootPath: ROOT_PATH
})

const OPTS_GOOD = {
  op: function () {
    return {
      data: 'yaay!'
    }
  }
}

describe('The main module', function () {
  it('should throw an error if no rootPath is specified', function () {
    try {
      require('../index.js')({
        rootPath: ''
      })
    } catch (e) {
      expect(e instanceof Error).to.equal(true)
    }
    try {
      require('../index.js')({
        wat: 'wat'
      })
    } catch (e) {
      expect(e instanceof Error).to.equal(true)
    }
    try {
      require('../index.js')({
        rootPath: null
      })
    } catch (e) {
      expect(e instanceof Error).to.equal(true)
    }
  })

  it('should allow the user to create a resource', function () {
    expect(typeof elbert.getResource === 'function').to.equal(true)
  })

  describe('getResource', function () {
    it('should throw an error if an op is not specified', function () {
      try { elbert.getResource() } catch (e) { expect(e instanceof Error) }
    })

    it('should return a resource that starts with the rootPath', function () {
      let resource = elbert.getResource(OPTS_GOOD)

      expect(resource.split(ROOT_PATH)[0]).to.equal('')
      expect(resource.split(ROOT_PATH)[1]).to.not.equal('')
    })

    it('should return a resource that is named by {path}', function () {
      let resource = elbert.getResource(Object.assign({}, OPTS_GOOD, {path: 'testPath'}))

      expect(resource.split(ROOT_PATH)[1]).to.equal('/testPath')
    })
  })
})
