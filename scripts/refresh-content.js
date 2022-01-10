const [changedFiles] = process.argv.slice(2)

const changedFilesPaths = changedFiles.split(',')
console.log(changedFilesPaths)