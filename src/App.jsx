import React, { useState } from 'react';
import './App.css';
import IncreasingInput from './IncreasingInput';
import { rollDice, summation } from './utils';

function toTokens(dicesInput) {
  if (dicesInput === '') {
    return [];
  }

  const filteredDiceInput = Array.from(dicesInput).filter((i) => i !== ' ');

  const result = [];
  let current = '';
  filteredDiceInput.forEach((c) => {
    if (c === '+') {
      if (current.length > 0) {
        result.push(current);
      }

      current = '';
    } else if (c === '-') {
      if (current.length > 0) {
        result.push(current);
      }

      current = '-';
    } else {
      current += c;
    }
  });

  result.push(current);

  return result;
}

function parseNumber(n) {
  const q = Number.parseInt(n, 10);
  if (Number.isNaN(q)) {
    return null;
  }

  return q;
}

function parseDice(diceToken) {
  if (!diceToken.includes('d')) {
    return null;
  }

  const [parseQuantity, parseSides, rest] = diceToken.split('d');

  if (rest !== undefined) {
    return null;
  }

  const signal = (parseQuantity[0] === '-') ? -1 : 1;
  const quantity = Math.abs(parseNumber(parseQuantity));
  const sides = parseNumber(parseSides);

  return { signal, quantity, sides };
}

function parseDiceTokens(tokens) {
  const numberRegex = /-?\d+/g;
  const diceRegex = /(-?\d+)?[dD]\d+/g;

  let extraValue = 0;
  const dices = [];
  tokens.forEach((token) => {
    if (token.match(diceRegex)) {
      dices.push(parseDice(token));
    } else if (token.match(numberRegex)) {
      extraValue += Number.parseInt(token, 10);
    } else {
      dices.push(null);
    }
  });

  return { dices, extraValue };
}

function valueSignal(value, index) {
  if (value < 0) {
    return '-';
  }

  if (index === 0) {
    return '';
  }

  return '+';
}

function calcDice(diceInput) {
  const { dices, extraValue } = parseDiceTokens(toTokens(diceInput));

  const rolledDices = dices.map(rollDice);

  let formattedDices = `${valueSignal(dices[0].signal, 0)}[${rolledDices[0]}]`;

  for (let i = 1; i < rolledDices.length; i += 1) {
    formattedDices += ` ${valueSignal(dices[i].signal, i)} [${rolledDices[i]}]`;
  }

  let formattedExtraValue = '';
  if (extraValue >= 0) {
    formattedExtraValue = ` + ${extraValue}`;
  } else {
    formattedExtraValue = ` - ${-extraValue}`;
  }

  let result = extraValue;
  rolledDices.forEach((dice, index) => { result += summation(dice) * dices[index].signal; });

  return `${formattedDices}${formattedExtraValue} = ${result}`;
}

function App() {
  const [dicesInput, setDicesInput] = useState('');
  const [result, setResult] = useState('');

  const reset = () => { setDicesInput(''); setResult(''); };

  const diceButtons = [2, 4, 6, 8, 10, 12, 20, 100].map((i) => (
    <button
      key={i}
      type="button"
      onClick={() => { setDicesInput(`${dicesInput}+1d${i}`); }}
    >
      d
      {i}
    </button>
  ));

  return (
    <div id="mainContent">
      <div id="diceFrame">
        <IncreasingInput
          className="numberInput"
          width={50}
          value={dicesInput}
          onChange={(e) => { setDicesInput(e.target.value); }}
        />

        <div id="result">
          {result}
        </div>
      </div>

      <div id="options">
        <div id="dicesOptions">
          {diceButtons}
        </div>
        <div id="operations">
          <button type="button" onClick={reset}>c</button>
          <button id="equalsOperator" type="button" onClick={() => { setResult(calcDice(dicesInput)); }}>=</button>
        </div>
      </div>
    </div>
  );
}

export default App;
