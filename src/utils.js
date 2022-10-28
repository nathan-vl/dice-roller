export function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function diceRoll(sides) {
  return randomInt(1, sides);
}

export function fudgeRoll() {
  const possibleResults = ['-', ' ', '+'];
  return possibleResults[Math.floor(Math.random() * possibleResults.length)];
}

export function fudgeToInt(n) {
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
