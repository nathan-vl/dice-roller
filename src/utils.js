function randomInt(max) {
  return Math.floor(Math.random() * max + 1);
}

export function summation(values) {
  return values.reduce((previousValue, currentValue) => previousValue + currentValue, 0);
}

export function rollDice({ sum, quantity, sides }) {
  let total = 0;
  for (let index = 0; index < quantity; index += 1) {
    total += randomInt(sides);
  }
  return total * (sum ? 1 : -1);
}
