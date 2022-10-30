function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function diceRoll(sides) {
  return randomInt(1, sides);
}

function fudgeRoll() {
  const possibleResults = ['-', ' ', '+'];
  return possibleResults[Math.floor(Math.random() * possibleResults.length)];
}

function fudgeToInt(n) {
  const possibleResults = { '-': -1, ' ': 0, '+': 1 };
  return possibleResults[n];
}

export function newDice(name, value) {
  return { name, value };
}

export function calcTotal(dices) {
  const values = dices.map(
    (dice) => ((dice.name === 'dF') ? fudgeToInt(dice.value) : dice.value),
  );
  const sum = values.reduce((total, current) => total + current);
  return sum;
}

export const DICES = {
  d4: () => diceRoll(4),
  d6: () => diceRoll(6),
  d8: () => diceRoll(8),
  d10: () => diceRoll(10),
  d12: () => diceRoll(12),
  d20: () => diceRoll(20),
  d100: () => diceRoll(100),
  dF: fudgeRoll,
};

export function rollDices(dices) {
  return dices.map((dice) => (newDice(dice.name, DICES[dice.name]())));
}
