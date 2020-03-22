const download = require('download-git-repo')

function creator(repository, targetDir, options) {
  return new Promise((resolve, reject) => {
    download(repository, targetDir, options, err => {
      if (err) return reject(err)
      resolve()
    })
  })
}

module.exports = creator