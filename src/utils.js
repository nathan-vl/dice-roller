function randomInt(max) {
  return Math.floor(Math.random() * max + 1);
}

export function summation(values) {
  return values.reduce((previousValue, currentValue) => previousValue + currentValue, 0);
}

export function rollDice({ quantity, sides }) {
  const total = [];
  for (let index = 0; index < quantity; index += 1) {
    total.push(randomInt(sides));
  }
  return total;
}
