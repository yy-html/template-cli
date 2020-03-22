const breforeCreate = require('./beforeCreate')
const creator = require('./creator')

async function create(name) {
  const { projectName, repository, targetDir } = await breforeCreate(name)

  console.log({ projectName, repository, targetDir })
  console.log('Start generating template...')

  await creator(repository, targetDir, { clone: true })
}

module.exports = (name) => {
  create(name)
    .then(res => {
      console.log('success!')
    })
    .catch(err => {
      console.log(err)
    })
}