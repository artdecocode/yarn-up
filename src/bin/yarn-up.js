#!/usr/bin/env node
import { resolve } from 'path'
import { spawn } from 'child_process'
import { _exclude, _upgrade } from './get-args'
import up from '../'

const packageJson = require(resolve(process.cwd(), 'package.json'))

;(async () => {
  try {
    await up(packageJson, _exclude ? _exclude.split(',') : undefined)
    if (_upgrade) spawn('yarn', ['upgrade'])
  } catch (err) {
    console.log(err)
  }
})()
