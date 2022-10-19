import React, { useState } from 'react';
import DiceInput from './DiceInput';
import { rollDice, summation } from './utils';
import './App.css';

function newDice(signal, quantity, sides) {
  return { signal, quantity, sides };
}

function App() {
  const [dices, setDices] = useState([]);

  const [signal, setSignal] = useState('+');

  const [result, setResult] = useState('');

  const addDice = (quantity, sides) => {
    setDices([...dices, newDice(signal, quantity, sides)]);
  };

  const setPlusSignal = () => { setSignal('+'); };
  const setMinusSignal = () => { setSignal('-'); };

  const addDiceInput = (quantity, sides) => { addDice(quantity, sides); setPlusSignal(); };

  const deleteLastDice = () => { setDices(dices.slice(0, -1)); };
  const reset = () => { setDices([]); setPlusSignal(); setResult(''); };
  const calcDice = () => {
    if (dices.length === 0) {
      return '';
    }

    const results = dices.map((dice) => rollDice(dice));
    const strResults = results.map((i) => (i.length === 1 ? i : `[${i.join(', ')}]`)).join(', ');

    const rolls = results.map(summation);
    let total = 0;
    for (let i = 0; i < dices.length; i += 1) {
      total += rolls[i] * (dices[i].signal === '+' ? 1 : -1);
    }

    return `${strResults} = ${total}`;
  };

  const diceButtons = [2, 4, 6, 8, 10, 12, 20, '%', 'X'].map((i) => (
    <button
      key={i}
      type="button"
      onClick={() => { addDiceInput(1, i === '%' ? 100 : i); }}
    >
      d
      {i}
    </button>
  ));

  const diceInputs = dices.map((i, index) => (
    <DiceInput
      key={index}
      signal={(index === 0 && i.signal === '+') ? '' : i.signal}
      quantity={i.quantity}
      sides={i.sides}
      onChangeQuantity={(quantity) => {
        setDices(dices.map((dice, j) => (
          (index === j) ? { ...dice, quantity } : dice)));
      }}
      onChangeSides={(sides) => {
        setDices(dices.map((dice, j) => (
          (index === j) ? { ...dice, sides } : dice)));
      }}
    />
  ));

  return (
    <div id="mainContent">
      <div id="resultDice">
        <div id="diceInputs">
          {diceInputs}
        </div>
        <div id="result">
          {result}
        </div>
      </div>

      <div id="options">
        <div id="dicesOptions">
          {diceButtons}
        </div>

        <div id="operations">
          <button type="button" onClick={deleteLastDice}>←</button>
          <button type="button" onClick={reset}>c</button>
          <button type="button" onClick={setPlusSignal}>+</button>
          <button type="button" onClick={setMinusSignal}>-</button>
          <button id="equalsOperator" type="button" onClick={() => { setResult(calcDice()); setPlusSignal(); }}>=</button>
        </div>
      </div>
    </div>
  );
}

export default App;
