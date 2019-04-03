const spanwcommand = require('spawncommand')
const { throws, equal } = require('zoroaster/assert')
const context = require('../context')
const yarnUp = require('../..')

const T = {
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
  async 'spawns the bin'({ binPath }) {
    const p = spanwcommand(binPath, [], {
      stdio: [0, 1, 2],
    })
    await p.promise
  },
  async 'spawns the bin with args'({ binPath }) {
    const p = spanwcommand(binPath, [
      '--exact',
    ], {
      stdio: [0, 1, 2],
    })
    await p.promise
  },
}

export default T