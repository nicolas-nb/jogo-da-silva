import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');

test('script principal existe e passa pela análise sintática', () => {
  const match = html.match(/<script type="module">([\s\S]*?)<\/script>/);
  assert.ok(match, 'script principal type=module não encontrado');

  const scriptBody = match[1].replace(/^\s*import\s+[^;]+;\s*/m, '');
  assert.doesNotThrow(() => new Function(scriptBody));
});

test('interface expõe status acessível e ações principais', () => {
  assert.match(html, /id="status" role="status" aria-live="polite"/);
  assert.match(html, /id="stats-button"/);
  assert.match(html, /id="archive-button"/);
  assert.match(html, /id="share-button"/);
});