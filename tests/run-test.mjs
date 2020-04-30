import test from "ava";
import execa from "execa";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const here = dirname(fileURLToPath(import.meta.url));

test("config-expander -h", async t => {
  const result = await execa("node", [ join(here, "..", "src", "config-expander-cli.mjs"),
    "-h"
  ]);
  t.regex(result.stdout, /Usage: config-expander/);
});

test("config-expander", async t => {
  const result = await execa("node", [ join(here, "..", "src", "config-expander-cli.mjs"),
    join(here, "..", "tests", "fixtures", "config.json")
  ]);
  t.regex(result.stdout, /"a":\s*1/);
});

test("config-expander constant", async t => {
  const result = await execa("node", [ join(here, "..", "src", "config-expander-cli.mjs"),
    join(here, "..", "tests", "fixtures", "config.json")
  ]);
  t.regex(result.stdout, /"b":\s*77/);
  t.regex(result.stdout, /"c":\s*77/);
});

test("config-expander -d", async t => {
  const result = await execa("node", [ join(here, "..", "src", "config-expander-cli.mjs"),
    "-d",
    "c2=88",
    join(here, "..", "tests", "fixtures", "config.json")
  ]);
  t.regex(result.stdout, /"d":\s*"88"/);
});
