#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const minimist = require('minimist')
const program = require('commander')

// 判断版本更新 ?
// help ?
// 空指令兼容 ?
// node版本

program
  .version(require('../package.json').version)
  .usage('<command> [options]')

program
  .command('create [project-name]')
  .description(`create a template by ${require('../package.json').name}`)
  .action((name, cmd) => {
    require('../lib/create')(name)
  })

program.parse(process.argv)