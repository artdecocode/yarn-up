import argufy from 'argufy'

export const argsConfig = {
  'exclude': {
    description: 'Comma-separated packages to exclude.',
    short: 'e',
  },
  'upgrade': {
    description: 'Run `yarn upgrade` after the update.',
    boolean: true,
    short: 'u',
  },
}
const args = argufy(argsConfig)

/**
 * Comma-separated packages to exclude.
 */
export const _exclude = /** @type {string} */ (args['exclude'])

/**
 * Run `yarn upgrade` after the update.
 */
export const _upgrade = /** @type {boolean} */ (args['upgrade'])

/**
 * The additional arguments passed to the program.
 */
export const _argv = /** @type {!Array<string>} */ (args._argv)