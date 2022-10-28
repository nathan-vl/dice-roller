import React from 'react';

export default function Dice({ className, value, onClick }) {
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
