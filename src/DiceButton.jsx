import React from 'react';

export default function DiceButton({ onClick, value }) {
  return (
    <button
      type="button"
      onClick={onClick}
    >
      {value}
    </button>
  );
}
