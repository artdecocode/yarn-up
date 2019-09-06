#!/usr/bin/env node
import { resolve } from 'path'
import spawn from 'spawncommand'
import { _exclude, _upgrade } from './get-args'
import up from '../'

const packageJson = require(resolve(process.cwd(), 'package.json'))

;(async () => {
  try {
    await up(packageJson, _exclude ? _exclude.split(',') : undefined)
    if (_upgrade) {
      const p = spawn('yarn', ['upgrade'])
      await p.promise
    }
  } catch (err) {
    console.log(err)
  }
})()
