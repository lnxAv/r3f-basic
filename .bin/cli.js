#!/usr/bin/env node
const { execSync } = require('child_process')
const runCommand = (command) => {
  try {
    execSync(`${command}`, { stdio: 'inherit' })
  } catch (e) {
    console.error(`Failed to execute : ${command}`, e)
    return false
  }
  return true
}

const repoName = process.argv[2]
const gitCheckoutCommand = `git clone --depth 1 https://github.com/lnxAv/r3f-basic ${repoName}`
const installDepsCommand = `cd ${repoName} && npm install`

var commands

console.log(`clone=`)
commands = runCommand(gitCheckoutCommand)
if (!commands) process.exit(-1)

console.log(`deps=`)
commands = runCommand(installDepsCommand)
if (!commands) process.exit(-1)

console.log(`good=`)
console.log(`how to start=`)
