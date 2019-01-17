import { expand } from "config-expander";
import { version } from "../package.json";
import { dirname, resolve, basename } from "path";
import program from "commander";

const configValues = [];

program
  .version(version)
  .description("evaluate configs")
  .command("expand", "expand config")
  .option("-d --define <key=value>", "define (config) value", value =>
    configValues.push(value)
  )
  .action(async (args) => {

    const constants = {
      basedir: dirname(args || process.cwd())
    };

    configValues.forEach(value => {
      const m = value.match(/^([a-zA-Z_][a-zA-Z_0-9]*)=(.*)/);
      if (m) {
        constants[m[1]] = m[2];
      }
    });

    const config = await expand(
      args.config ? "${include('" + args + "')}" : {},
      {
        constants
      }
    );

    process.stdout.write(JSON.stringify(config, undefined, 2));
  }).parse(process.argv);
