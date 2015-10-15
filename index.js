'use strict'

// const promise = require('promise')

function elbert (opts) {
  let rootPath
  let options = opts || {}

  if (options.rootPath === null ||
    options.rootPath === undefined ||
    options.rootPath === '') {
    throw new Error('You must define a {rootPath: "http://somedomain.com/somepath/""} in order to use elbert')
  }
  rootPath = options.rootPath

  function getResource (params) {
    params = params || {}
    let path = params.path ? params.path : generateRandomPath()

    if (!params.op) throw new Error('You must specify {op: function} that returns a data or a resource')

    return `${rootPath}/${path}`
  }

  function generateRandomPath () {
    return '/someResource'
  }

  return {
    getResource
  }
}

module.exports = elbert
