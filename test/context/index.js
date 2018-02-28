const { resolve } = require('path')

const binPath = resolve(__dirname, '../../bin/yarn-up')

function Context() {
  this.binPath = binPath
}

module.exports = Context
