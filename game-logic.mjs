export const DAILY_WORDS = [
  'JANELA', 'CIDADE', 'CASTELO', 'MELANCIA', 'BICICLETA', 'PASTEL', 'SILVESTRE', 'FLORESTA', 'MONTANHA',
  'CAMINHO', 'LIVRO', 'SOMBRIO', 'PRIMAVERA', 'PESCADOR', 'VITRINE', 'PEDRA', 'CINEMA',
  'TRILHA', 'TABUA', 'BOLSA', 'RAPAZ', 'FUTURO', 'AMARELO', 'COLINA', 'SORRISO', 'JARDIM',
  'MUSEU', 'TARDE', 'PORTA', 'NUVEM', 'VITORIA', 'MALHA', 'ORQUESTA', 'SONHO', 'PAISAGEM'
];

export const VALID_WORDS = new Set([
  ...DAILY_WORDS,
  'LANTERNA', 'CADERNO', 'MALHADO', 'ARROZ', 'PAPEL', 'FESTA', 'AMIGO', 'ROCHA', 'ILHA', 'HISTORIA',
  'GARRAFA', 'GRANDE', 'NOITE', 'SEMENTE', 'LAGO', 'BOTOES', 'ESCOLA', 'TRABALHO', 'MIRANTE', 'FOLHA'
]);

export function normalizeWord(value) {
  return String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase();
}

export function toLocalDateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getDailyWord(date = new Date()) {
  const key = toLocalDateKey(date);
  let hash = 0;
  for (let i = 0; i < key.length; i += 1) {
    hash = (hash * 31 + key.charCodeAt(i)) >>> 0;
  }
  return DAILY_WORDS[hash % DAILY_WORDS.length];
}

export function evaluateGuess(guess, answer) {
  const normalizedGuess = normalizeWord(guess).split('');
  const normalizedAnswer = normalizeWord(answer).split('');
  if (normalizedGuess.length !== normalizedAnswer.length) {
    throw new RangeError('Tentativa e resposta precisam ter o mesmo tamanho.');
  }

  const result = Array(normalizedGuess.length).fill('absent');
  const remaining = new Map();

  for (let index = 0; index < normalizedAnswer.length; index += 1) {
    if (normalizedGuess[index] === normalizedAnswer[index]) {
      result[index] = 'correct';
    } else {
      const letter = normalizedAnswer[index];
      remaining.set(letter, (remaining.get(letter) || 0) + 1);
    }
  }

  for (let index = 0; index < normalizedGuess.length; index += 1) {
    if (result[index] === 'correct') continue;
    const letter = normalizedGuess[index];
    const count = remaining.get(letter) || 0;
    if (count > 0) {
      result[index] = 'present';
      remaining.set(letter, count - 1);
    }
  }

  return result;
}