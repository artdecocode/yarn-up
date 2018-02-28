const spawncommand = require('spawncommand')

async function run(packageJson) {
  if (packageJson === null || packageJson === undefined) {
    throw new Error('Package.json content is not given')
  }
  const { devDependencies, dependencies } = packageJson
  const keys = Object.keys({ ...devDependencies, ...dependencies })
    .map(s => `${s}@latest`)

  const proc = spawncommand('yarn', ['upgrade', ...keys], {
    stdio: 'inherit',
  })
  await proc.promise
}

module.exports = run
