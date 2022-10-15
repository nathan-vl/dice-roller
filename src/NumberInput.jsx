import React from 'react';

const clamp = (num, min, max) => Math.max(min, Math.min(max, num));

export default function NumberInput({
  className, value, minValue, maxValue, onChange,
}) {
  return (
    <input
      style={{ width: `${Math.max(1, Number(value).toString().length)}ch` }}
      className={className}
      type="number"
      value={Number(value).toString()}
      onChange={(e) => {
        onChange(clamp(e.target.value, minValue, maxValue));
      }}
    />
  );
}
