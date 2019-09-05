#!/usr/bin/env node
import { resolve } from 'path'
import { _exclude } from './get-args'
import up from '../'

const packageJson = require(resolve(process.cwd(), 'package.json'))

;(async () => {
  try {
    await up(packageJson, _exclude ? _exclude.split(',') : undefined)
  } catch (err) {
    console.log(err)
  }
})()
