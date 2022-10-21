import React from 'react';

function IncreasingInput({
  className, width, value, onChange,
}) {
  return (
    <input
      className={className}
      style={{ width: `${width}ch` }}
      type="text"
      value={value}
      onChange={onChange}
    />
  );
}

export default IncreasingInput;
