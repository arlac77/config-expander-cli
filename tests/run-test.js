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
  t.regex(result.stdout, /"a":\s*1/);
});

test('config-expander expand constant', async t => {
  const result = await execa(join(__dirname, '..', 'bin', 'config-expander'), [
    'expand',
    join(__dirname, '..', 'tests', 'fixtures', 'config.json')
  ]);
  t.regex(result.stdout, /"b":\s*77/);
  //t.regex(result.stdout, /"c":\s*77/);
});

test('config-expander expand -d', async t => {
  const result = await execa(join(__dirname, '..', 'bin', 'config-expander'), [
    'expand',
    '-d',
    'c2=88',
    join(__dirname, '..', 'tests', 'fixtures', 'config.json')
  ]);
  t.regex(result.stdout, /"d":\s*"88"/);
});
