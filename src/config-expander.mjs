import { expand } from 'config-expander';
import { version } from '../package.json';
import { dirname, resolve, basename } from 'path';

const program = require('caporal');
const configValues = [];

program
  .version(version)
  .description('evaluate configs')
  .command('expand', 'expand config')
  .option('-d --define <key=value>', 'define (config) value', value =>
    configValues.push(value)
  )
  .argument('<config>', 'config file to expand')
  .action(async (args, options, logger) => {
    const constants = {
      basedir: dirname(args.config || process.cwd())
    };

    configValues.forEach(value => {
      const m = value.match(/^([a-zA-Z_][a-zA-Z_0-9]*)=(.*)/);
      if (m) {
        constants[m[1]] = m[2];
      }
    });

    const config = await expand(
      args.config ? "${include('" + basename(args.config) + "')}" : {},
      {
        constants
      }
    );

    process.stdout.write(JSON.stringify(config, undefined, 2));
  });

program.parse(process.argv);
