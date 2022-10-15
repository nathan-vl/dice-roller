import React from 'react';
import NumberInput from './NumberInput';

export default function DiceInput({
  signal, sides, quantity, onChangeSides, onChangeQuantity,
}) {
  return (
    <div className="diceInput">
      {signal}
      <NumberInput
        className="numberInput"
        value={quantity}
        minValue={0}
        maxValue={999}
        onChange={onChangeQuantity}
      />
      D
      <NumberInput
        className="numberInput"
        value={sides}
        minValue={0}
        maxValue={999}
        onChange={onChangeSides}
      />
    </div>
  );
}
