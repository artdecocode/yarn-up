const spanwcommand = require('spawncommand')
const { resolve } = require('path')
const { throws, equal } = require('zoroaster/assert')
const context = require('../context')
const yarnUp = require('../..')

process.env.ZOROASTER_TIMEOUT = 3000

const yarnUpTestSuite = {
  context,
  'should be a function'() {
    equal(typeof yarnUp, 'function')
  },
  async 'should call package without error'() {
    await throws({
      fn: yarnUp,
      message: 'Package.json content is not given',
    })
  },
  async 'spawns the bin'() {
    const p = spanwcommand(resolve(__dirname, '../../bin/yarn-up'), [], {
      stdio: [0, 1, 2],
    })
    await p.promise
  },
}

module.exports = yarnUpTestSuite
