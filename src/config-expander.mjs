import { expand } from 'config-expander';
import { version } from '../package.json';
import { dirname, resolve, basename } from 'path';

const program = require('caporal'),

program
  .version(version)
  .description('evaluate configs')
  .option('-c, --config <file>', 'use config from file')
  .action(async (args, options, logger) => {
    if (options.debug) {
      logLevel = 'debug';
    } else if (options.trace) {
      logLevel = 'trace';
    }

    const constants = {
      basedir: dirname(options.config || process.cwd())
    };

    const config = await expand(
      options.config
        ? "${include('" + basename(options.config) + "')}"
        : {
          },
      {
        constants
      }
    );

    logger.log(config);
});

program.parse(process.argv);
