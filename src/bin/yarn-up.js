#!/usr/bin/env node
import { resolve } from 'path'
import up from '../'

const packageJson = require(resolve(process.cwd(), 'package.json'))

;(async () => {
  try {
    await up(packageJson)
  } catch (err) {
    console.log(err)
  }
})()
