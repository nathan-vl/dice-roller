import React, { useState } from 'react';
import './App.css';

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const diceRoll = (sides) => randomInt(1, sides);

function fudgeRoll() {
  const possibleResults = ['-', ' ', '+'];
  const { length } = possibleResults;
  return possibleResults[Math.floor(Math.random() * length)];
}

function newDice(name, value) {
  return { name, value };
}

function Dice({ className, value, onClick }) {
  return (
    <div
      className={`dice ${className}`}
      onClick={onClick}
      onKeyUp={onClick}
      role="button"
      tabIndex={0}
    >
      {value}
    </div>
  );
}

const DICES = {
  d4: () => diceRoll(4),
  d6: () => diceRoll(6),
  d8: () => diceRoll(8),
  d10: () => diceRoll(10),
  d12: () => diceRoll(12),
  d20: () => diceRoll(20),
  'd%': () => diceRoll(100),
  dF: fudgeRoll,
};

function App() {
  const [dices, setDices] = useState([]);

  const clearDices = () => { setDices([]); };
  const rerollDices = () => {
    setDices((current) => current.map((dice) => (newDice(dice.name, DICES[dice.name]()))));
  };

  const diceButtons = Object.keys(DICES).map((diceKey) => (
    <button
      key={diceKey}
      type="button"
      onClick={() => {
        setDices((current) => [...current, newDice(diceKey, DICES[diceKey]())]);
      }}
    >
      {diceKey}
    </button>
  ));

  const visualDice = dices.map((dice, i) => (
    <Dice
      key={i}
      className={dice.name}
      value={dice.value}
      onClick={() => { setDices((current) => current.filter((_, j) => i !== j)); }}
    />
  ));

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <button type="button" onClick={clearDices}>c</button>
          <button type="button" onClick={rerollDices}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
              <path fill="none" d="M0 0h24v24H0z" />
              <path d="M5.463 4.433A9.961 9.961 0 0 1 12 2c5.523 0 10 4.477 10 10 0 2.136-.67 4.116-1.81 5.74L17 12h3A8 8 0 0 0 6.46 6.228l-.997-1.795zm13.074 15.134A9.961 9.961 0 0 1 12 22C6.477 22 2 17.523 2 12c0-2.136.67-4.116 1.81-5.74L7 12H4a8 8 0 0 0 13.54 5.772l.997 1.795z" />
            </svg>
          </button>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, 4em)',
          width: '100%',
        }}
        >
          {diceButtons}
        </div>
      </div>

      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        minHeight: '5em',
      }}
      >
        {visualDice}
      </div>
    </div>
  );
}

export default App;
