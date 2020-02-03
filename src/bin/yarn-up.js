#!/usr/bin/env node
import { resolve } from 'path'
import spawn from 'spawncommand'
import { reduceUsage } from 'argufy'
import usually from 'usually'
import { _exclude, _upgrade, _help, _version, argsConfig } from './get-args'
import up from '../'

if (_help) {
  const usage = usually({
    description: 'Upgrade all dependencies to the next version.',
    example: 'yarn-up -e preact -u',
    line: 'yarn-up [-e packageA,packageB] [-u] [-hv]',
    usage: reduceUsage(argsConfig),
  })
  console.log(usage)
  process.exit(0)
} else if (_version) {
  console.log(require('../../package.json').version)
  process.exit(0)
}

const packageJson = require(resolve(process.cwd(), 'package.json'))

;(async () => {
  try {
    await up(packageJson, _exclude ? _exclude.split(',') : undefined)
    if (_upgrade) {
      const { promise } = spawn('yarn', ['upgrade'], /** @type {!child_process.SpawnOptions} */ ({
        shell: process.platform == 'win32',
        stdio: 'inherit',
      }))
      await promise
    }
  } catch (err) {
    console.log(err)
  }
})()
