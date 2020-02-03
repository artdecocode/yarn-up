import spawn from 'spawncommand'

export default async function run(packageJson, exclude = []) {
  if (packageJson === null || packageJson === undefined) {
    throw new Error('Package.json content is not given')
  }
  const { 'devDependencies': devDependencies,
    'dependencies': dependencies } = packageJson
  const total = ({ ...devDependencies, ...dependencies })
  const keys = Object.keys(total).filter(a => {
    return !exclude.includes(a)
  })

  const [exactDeps, tildaDeps] = keys.reduce(([e, t], key) => {
    const val = total[key]
    if (/^\d/.test(val)) e.push(key)
    else t.push(key)
    return [e, t]
  }, [[], []])


  if (exactDeps.length) await runUpgrade(exactDeps, true)
  if (tildaDeps.length) await runUpgrade(tildaDeps)
}

const runUpgrade = async (keys, exact = false) => {
  const latest = keys.map(s => `${s}@latest`)

  const allArgs = ['upgrade', ...latest, ...(exact ? ['-E']: [])]
  process.stdout.write(['yarn', ...allArgs, '\n'].join(' '))

  const { promise } = spawn('yarn', allArgs, /** @type {!child_process.SpawnOptions} */ ({
    shell: process.platform == 'win32',
    stdio: 'inherit',
  }))
  await promise
}

/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('child_process').SpawnOptions} child_process.SpawnOptions
 */