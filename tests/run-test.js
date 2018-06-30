import test from 'ava';
import { join } from 'path';
import execa from 'execa';

test('config-expander', async t => {
  const result = await execa(join(__dirname, '..', 'bin', 'config-expander'), [
    '-h'
  ]);
  t.regex(result.stdout, /--config <file>/);
});
