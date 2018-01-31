const assert = require('assert')
const context = require('../context/')
const yarnUp = require('../../src/')

const yarnUpTestSuite = {
    context,
    'should be a function': () => {
        assert.equal(typeof yarnUp, 'function')
    },
    'should call package without error': () => {
        assert.doesNotThrow(() => {
            yarnUp()
        })
    },
}

module.exports = yarnUpTestSuite
