import spawn from 'spawncommand'

export default async function run(packageJson) {
  if (packageJson === null || packageJson === undefined) {
    throw new Error('Package.json content is not given')
  }
  const { 'devDependencies': devDependencies,
    'dependencies': dependencies } = packageJson
  const total = ({ ...devDependencies, ...dependencies })
  const keys = Object.keys(total)

  const [exactDeps, tildaDeps] = keys.reduce(([e, t], key) => {
    const val = total[key]
    if (/^\d/.test(val)) e.push(key)
    else t.push(key)
    return [e, t]
  }, [[], []])


  if (exactDeps.length) await runUpgrade(exactDeps, true)
  if (tildaDeps.length) await runUpgrade(tildaDeps)
}

const runUpgrade = async (keys, exact) => {
  const latest = keys.map(s => `${s}@latest`)

  const allArgs = ['upgrade', ...latest, ...(exact ? ['-E']: [])]
  process.stdout.write(['yarn', ...allArgs, '\n'].join(' '))

  const proc = spawn('yarn', allArgs, {
    stdio: 'inherit',
  })
  await proc.promise
}