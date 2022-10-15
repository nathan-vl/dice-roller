import React, { useState } from 'react';
import AddDiceButton from './AddDiceButton';
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

  const diceButtons = [2, 4, 6, 8, 10, 12, 20, '%', 'X'].map((i) => (
    <AddDiceButton key={i} sides={i} onClick={addDice} />
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

  const reset = () => { setDices([]); setSum(true); setResult(null); };
  const deleteLatestDice = () => { setDices(dices.slice(0, -1)); };
  const setPlusSignal = () => { setSum(true); };
  const setMinusSignal = () => { setSum(false); };
  const calcDice = () => { if (dices.length > 0) setResult(summation(dices.map(rollDice))); };

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
          <button type="button" onClick={deleteLatestDice}>del</button>
          <button type="button" onClick={reset}>c</button>
          <button type="button" disabled={sum} onClick={setPlusSignal}>+</button>
          <button type="button" disabled={!sum} onClick={setMinusSignal}>-</button>
          <button id="equalsOperator" type="button" onClick={calcDice}>=</button>
        </div>
      </div>
    </div>
  );
}

export default App;
