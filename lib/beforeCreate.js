const fs = require('fs-extra')
const path = require('path')
const inquirer = require('inquirer')
const validateProjectName = require('validate-npm-package-name')

async function beforeCreate(projectName) {
  // 项目名称
  if (!projectName) {
    ({ projectName } = await inquirer.prompt([
      {
        name: 'projectName',
        type: 'input',
        message: 'project name'
      }
    ]))
  }

  // 判断项目名称合法性
  const result = validateProjectName(projectName)
  if (!result.validForNewPackages) {
    throw `Invalid project name: "${projectName}"`
  }

  // 判断目标路径是否存在
  const targetDir = path.resolve(process.cwd(), projectName)
  if (fs.existsSync(targetDir)) {
    const { isMerge } = await inquirer.prompt([
      {
        name: 'isMerge',
        type: 'confirm',
        message: `The current path already exists, merge or not?`
      }
    ])
    if (isMerge) {
      await fs.remove(targetDir)
    } else {
      throw 'cancel'
    }
  }

  // 选择模版
  const { repositories } = require('../config')
  const { repository } = await inquirer.prompt([
    {
      name: 'repository',
      // type: 'confirm',
      type: 'list',
      message: 'select template',
      choices: repositories.map(({ name, url }) => ({ name, value: url }))
    }
  ])

  return {
    projectName,
    repository,
    targetDir,
  }
}

module.exports = beforeCreate