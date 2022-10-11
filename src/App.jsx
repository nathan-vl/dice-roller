/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import './App.css';

function randomInt(max) {
  return Math.floor(Math.random() * max + 1);
}

function summation(values) {
  return values.reduce((previousValue, currentValue) => previousValue + currentValue, 0);
}

function charSignal(sum) {
  return sum ? '+' : '-';
}

function rollDice({ sum, quantity, sides }) {
  let total = 0;
  for (let index = 0; index < quantity; index += 1) {
    total += randomInt(sides);
  }
  return total * (sum ? 1 : -1);
}

function AddDice({ sides, callback }) {
  return (
    <button
      className="btn"
      type="button"
      onClick={() => { callback(1, sides === '%' ? 100 : sides); }}
    >
      d
      {sides}
    </button>
  );
}

function DisplayDice({
  signal, sides, quantity, onChangeSides, onChangeQuantity,
}) {
  return (
    <div className="diceInput">
      {signal ?? ''}
      <input
        type="text"
        value={quantity}
        // maxLength="2"
        onChange={(e) => {
          if (e.target.value.length === 0) {
            onChangeQuantity('');
          } else if (!Number.isNaN(e.target.value) && e.target.value[0] !== '-') {
            onChangeQuantity(parseInt(e.target.value, 10));
          }
        }}
      />
      d
      <input
        type="text"
        value={sides}
        onChange={(e) => {
          if (e.target.value.length === 0) {
            onChangeSides('');
          } else if (!Number.isNaN(e.target.value) && e.target.value[0] !== '-') {
            onChangeSides(parseInt(e.target.value, 10));
          }
        }}
      />
    </div>
  );
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

  const diceButtons = [2, 4, 6, 8, 10, 12, 20, '%', 'X'].map((i, index) => (
    <AddDice key={index} sides={i} callback={addDice} />
  ));

  const diceComponents = dices.map((i, index) => (
    <DisplayDice
      key={index}
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
