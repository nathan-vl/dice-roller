import React, { useState } from 'react';
import Dice from './Dice';
import DiceButton from './DiceButton';
import {
  calcTotal, diceRoll, fudgeRoll, newDice,
} from './utils';
import './App.css';
import refreshSvg from './assets/refresh.svg';

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
    setDices((current) => (
      current.map((dice) => (newDice(dice.name, DICES[dice.name]())))));
  };

  const diceButtons = Object.keys(DICES).map((diceKey) => (
    <DiceButton
      key={diceKey}
      value={diceKey}
      onClick={() => {
        setDices((current) => [...current, newDice(diceKey, DICES[diceKey]())]);
      }}
    />
  ));

  const visualDice = dices.map((dice, i) => (
    <Dice
      key={i}
      className={dice.name}
      value={dice.value}
      onClick={() => {
        setDices((current) => current.filter((_, j) => i !== j));
      }}
    />
  ));

  const totalSum = dices.length === 0 ? null : (
    <div id="totalSum">
      Total:
      {' '}
      {calcTotal(dices)}
    </div>
  );

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

      {totalSum}
    </>
  );
}

export default App;
