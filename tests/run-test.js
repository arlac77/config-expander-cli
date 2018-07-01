import test from 'ava';
import { join } from 'path';
import execa from 'execa';

test('config-expander -h', async t => {
  const result = await execa(join(__dirname, '..', 'bin', 'config-expander'), [
    '-h'
  ]);
  t.regex(result.stdout, /config-expander expand/);
});

test('config-expander expand', async t => {
  const result = await execa(join(__dirname, '..', 'bin', 'config-expander'), [
    'expand',
    join(__dirname, '..', 'tests', 'fixtures', 'config.json')
  ]);
  t.regex(result.stdout, /a:\s*1/);
});
