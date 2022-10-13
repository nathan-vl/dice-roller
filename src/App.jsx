import React, { useState } from 'react';
import AddDiceButton from './AddDiceButton';
import DiceInput from './DiceInput';
import { rollDice, summation } from './utils';
import './App.css';

function charSignal(sum) {
  return sum ? '+' : '-';
}

function newDice(sum, quantity, sides) {
  return { sum, quantity, sides };
}

function App() {
  const [dices, setDices] = useState([]);
  // const [extra, setExtra] = useState(0);

  const [sum, setSum] = useState(true);
  const [result, setResult] = useState(null);

  const addDice = (quantity, sides) => {
    setDices([...dices, newDice(sum, quantity, sides)]);
  };

  const diceButtons = [2, 4, 6, 8, 10, 12, 20, '%', 'X'].map((i) => (
    <AddDiceButton key={i} sides={i} onClick={addDice} />
  ));

  const diceComponents = dices.map((i, index) => (
    <DiceInput
      key={i}
      signal={(index === 0 && i.sum) ? '' : charSignal(i.sum)}
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
    <div className="wrapper">
      <div className="mainCalculator">
        <div className="display">
          <div style={{ overflowY: 'scroll', maxHeight: '9ch', minHeight: '9ch' }}>
            {diceComponents}
          </div>
          <hr />
          <div style={{ textAlign: 'right', minHeight: '3ch' }}>
            {(result !== null) ? `= ${result}` : ''}
          </div>
        </div>

        <div style={{
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          gap: '.5em',
        }}
        >
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, max-content)',
            rowGap: '.5em',
            columnGap: '.5em',
          }}
          >
            {diceButtons}
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 40px)',
            rowGap: '.5em',
            columnGap: '.5em',
          }}
          >
            <button
              className="btn-warn btn-operator"
              type="button"
              onClick={() => { setDices(dices.slice(0, -1)); }}
            >
              ⇦
            </button>
            <button
              className="btn-warn btn-operator"
              type="button"
              onClick={() => { setDices([]); setSum(true); setResult(null); }}
            >
              c
            </button>
            <button className="btn btn-operator" type="button" disabled={sum} onClick={() => { setSum(true); }}>+</button>
            <button className="btn btn-operator" type="button" disabled={!sum} onClick={() => { setSum(false); }}>-</button>
            <button
              id="btn-equals"
              type="button"
              onClick={() => { if (dices.length > 0) setResult(summation(dices.map(rollDice))); }}
            >
              =
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
