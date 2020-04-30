import { readFileSync } from "fs";
import { join, resolve, dirname } from "path";
import { fileURLToPath } from "url";
import program from "commander";
import { expand } from "config-expander";

const here = dirname(fileURLToPath(import.meta.url));

const { version, description } = JSON.parse(
  readFileSync(
    join(here, "..", "package.json"),
    { endoding: "utf8" }
  )
);

const constants = {};

program
  .version(version)
  .description(description)
  .option("-d --define <key=value>", "define (config) value", value => {
    const m = value.match(/^([a-zA-Z_][a-zA-Z_0-9]*)=(.*)/);
    if (m) {
      constants[m[1]] = m[2];
    }
  })
  .action(async args => {
    const config = await expand("${include('" + args + "')}",
      {
        constants
      }
    );

    process.stdout.write(JSON.stringify(config, undefined, 2));
  })
  .parse(process.argv);
