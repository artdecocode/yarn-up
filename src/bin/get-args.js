import argufy from 'argufy'

export const argsConfig = {
  'exclude': {
    description: 'The arguments to exclude.',
    short: 'e',
  },
}
const args = argufy(argsConfig)

/**
 * The arguments to exclude.
 */
export const _exclude = /** @type {string} */ (args['exclude'])

/**
 * The additional arguments passed to the program.
 */
export const _argv = /** @type {!Array<string>} */ (args._argv)