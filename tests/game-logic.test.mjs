import test from 'node:test';
import assert from 'node:assert/strict';
import {
  DAILY_WORDS,
  evaluateGuess,
  getDailyWord,
  normalizeWord,
  toLocalDateKey,
  VALID_WORDS
} from '../game-logic.mjs';

test('normaliza acentos e caixa para comparação', () => {
  assert.equal(normalizeWord('Vitória'), 'VITORIA');
  assert.equal(normalizeWord('çAçAdA'), 'CACADA');
});

test('marca letras corretas na posição e presentes em outra posição', () => {
  assert.deepEqual(evaluateGuess('CASA', 'SACO'), ['present', 'correct', 'present', 'absent']);
});

test('limita letras presentes à quantidade existente na resposta', () => {
  assert.deepEqual(evaluateGuess('ALALA', 'SALSA'), ['present', 'present', 'absent', 'absent', 'correct']);
});

test('aceita respostas com e sem acento como equivalentes', () => {
  assert.deepEqual(evaluateGuess('VITORIA', 'VITÓRIA'), Array(7).fill('correct'));
});

test('rejeita tentativas com tamanho diferente da resposta', () => {
  assert.throws(() => evaluateGuess('SOL', 'LAGO'), RangeError);
});

test('todas as palavras diárias respeitam o intervalo de 5 a 10 letras', () => {
  assert.ok(DAILY_WORDS.length > 0);
  assert.ok(DAILY_WORDS.every((word) => word.length >= 5 && word.length <= 10));
});

test('toda palavra diária também é uma tentativa válida', () => {
  assert.ok(DAILY_WORDS.every((word) => VALID_WORDS.has(word)));
});

test('a palavra diária é determinística para a data local', () => {
  const date = new Date(2026, 9, 20, 12);
  assert.equal(toLocalDateKey(date), '2026-10-20');
  assert.equal(getDailyWord(date), getDailyWord(new Date(2026, 9, 20, 23, 59)));
});