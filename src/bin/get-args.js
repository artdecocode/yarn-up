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
  'help': {
    description: 'Display usage information.',
    boolean: true,
    short: 'h',
  },
  'version': {
    description: 'Show version number.',
    boolean: true,
    short: 'v',
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
 * Display usage information.
 */
export const _help = /** @type {boolean} */ (args['help'])

/**
 * Show version number.
 */
export const _version = /** @type {boolean} */ (args['version'])

/**
 * The additional arguments passed to the program.
 */
export const _argv = /** @type {!Array<string>} */ (args._argv)