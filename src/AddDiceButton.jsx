import React from 'react';

export default function AddDiceButton({ sides, onClick }) {
  return (
    <button
      type="button"
      onClick={() => { onClick(1, sides === '%' ? 100 : sides); }}
    >
      D
      {sides}
    </button>
  );
}
