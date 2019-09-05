import { spawn } from 'child_process'

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

  await new Promise((r, j) => {
    const proc = spawn('yarn', allArgs, /** @type {!child_process.SpawnOptions} */ ({
      stdio: 'inherit',
    }))
    proc.on('close', () => {
      r()
    })
    proc.on('error', (e) => {
      j(e)
    })
  })
}