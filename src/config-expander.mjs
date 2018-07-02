import { expand } from 'config-expander';
import { version } from '../package.json';
import { dirname, resolve, basename } from 'path';

const program = require('caporal');

program
  .version(version)
  .description('evaluate configs')
  .command('expand', 'expand config')
  .argument('<config>', 'config file to expand')
  .action(async (args, options, logger) => {
    const constants = {
      basedir: dirname(args.config || process.cwd())
    };

    const config = await expand(
      args.config ? "${include('" + basename(args.config) + "')}" : {},
      {
        constants
      }
    );

    process.stdout.write(JSON.stringify(config, undefined, 2));
  });

program.parse(process.argv);
