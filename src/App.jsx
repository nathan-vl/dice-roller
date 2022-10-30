import React, { useState } from 'react';
import Dice from './Dice';
import DiceButton from './DiceButton';
import RollButton from './RollButton';
import TotalDiceRolls from './TotalDiceRolls';
import { DICES, newDice, rollDices } from './utils';
import './App.css';

function App() {
  const [dices, setDices] = useState([]);

  const clearIfNotEmpty = () => { if (dices.length > 0) setDices([]); };
  const rollIfNotEmpty = () => { if (dices.length > 0) setDices(rollDices); };

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

  return (
    <>
      <div id="mainButtons">
        <div id="operators">
          <button type="button" onClick={clearIfNotEmpty}>c</button>
          <RollButton onClick={rollIfNotEmpty} />
        </div>
        <div id="diceButtons">{diceButtons}</div>
      </div>

      <div id="dices">{visualDice}</div>

      <TotalDiceRolls dices={dices} />
    </>
  );
}

export default App;
