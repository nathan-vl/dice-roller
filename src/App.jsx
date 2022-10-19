import React, { useState } from 'react';
import DiceInput from './DiceInput';
import { rollDice, summation } from './utils';
import './App.css';

function newDice(sum, quantity, sides) {
  return { sum, quantity, sides };
}

function App() {
  function charSignal(index, sum) {
    if (index === 0 && sum) { return ''; }
    if (sum) { return '+'; }
    return '-';
  }

  const [dices, setDices] = useState([]);

  const [sum, setSum] = useState(true);
  const [result, setResult] = useState(null);

  const addDice = (quantity, sides) => {
    setDices([...dices, newDice(sum, quantity, sides)]);
  };

  const setPlusSignal = () => { setSum(true); };
  const addDiceInput = (quantity, sides) => { addDice(quantity, sides); setPlusSignal(); };

  const deleteLastDice = () => { setDices(dices.slice(0, -1)); };
  const reset = () => { setDices([]); setSum(true); setResult(null); };
  const setMinusSignal = () => { setSum(false); };
  const calcDice = () => { if (dices.length > 0) setResult(summation(dices.map(rollDice))); };

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
      signal={charSignal(index, i.sum)}
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
          {(result !== null) ? `= ${result}` : ''}
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
          <button id="equalsOperator" type="button" onClick={() => { calcDice(); setPlusSignal(); }}>=</button>
        </div>
      </div>
    </div>
  );
}

export default App;
