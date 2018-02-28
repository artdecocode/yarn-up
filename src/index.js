const spawncommand = require('spawncommand')

async function run(packageJson, args = []) {
  if (packageJson === null || packageJson === undefined) {
    throw new Error('Package.json content is not given')
  }
  const { devDependencies, dependencies } = packageJson
  const keys = Object.keys({ ...devDependencies, ...dependencies })
    .map(s => `${s}@latest`)

  const allArgs = ['upgrade', ...keys, ...args]
  process.stdout.write(['yarn', ...allArgs, '\n'].join(' '))

  const proc = spawncommand('yarn', allArgs, {
    stdio: 'inherit',
  })
  await proc.promise
}

module.exports = run
