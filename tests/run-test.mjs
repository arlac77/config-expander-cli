import test from 'ava';
import { join } from 'path';
import execa from 'execa';
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const here = dirname(fileURLToPath(import.meta.url));

test('config-expander -h', async t => {
  const result = await execa(join(here, '..', 'bin', 'config-expander'), [
    '-h'
  ]);
  t.regex(result.stdout, /config-expander expand/);
});

test('config-expander', async t => {
  const result = await execa(join(here, '..', 'bin', 'config-expander'), [
    'expand',
    join(here, '..', 'tests', 'fixtures', 'config.json')
  ]);
  t.regex(result.stdout, /"a":\s*1/);
});

test('config-expander constant', async t => {
  const result = await execa(join(here, '..', 'bin', 'config-expander'), [
    'expand',
    join(here, '..', 'tests', 'fixtures', 'config.json')
  ]);
  t.regex(result.stdout, /"b":\s*77/);
  t.regex(result.stdout, /"c":\s*77/);
});

test('config-expander -d', async t => {
  const result = await execa(join(here, '..', 'bin', 'config-expander'), [
    'expand',
    '-d',
    'c2=88',
    join(here, '..', 'tests', 'fixtures', 'config.json')
  ]);
  t.regex(result.stdout, /"d":\s*"88"/);
});
