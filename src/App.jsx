import React, { useState } from 'react';
import './App.css';
import refreshSvg from './assets/refresh.svg';

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function diceRoll(sides) {
  return randomInt(1, sides);
}

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
  d100: () => diceRoll(100),
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
    <>
      <div id="mainButtons">
        <div id="operators">
          <button type="button" onClick={clearDices}>c</button>
          <button type="button" onClick={rerollDices}>
            <img src={refreshSvg} alt="refresh" width="20px" />
          </button>
        </div>
        <div id="diceButtons">{diceButtons}</div>
      </div>

      <div id="dices">{visualDice}</div>
    </>
  );
}

export default App;
