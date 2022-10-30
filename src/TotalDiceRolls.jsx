import React from 'react';
import { calcTotal } from './utils';

export default function TotalDiceRolls({ dices }) {
  if (dices.length === 0) {
    return null;
  }

  return (
    <div id="totalSum">
      Total:
      {' '}
      {calcTotal(dices)}
    </div>
  );
}
