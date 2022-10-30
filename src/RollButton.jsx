import React from 'react';
import refreshSvg from './assets/refresh.svg';

export default function RollButton({ onClick }) {
  return (
    <button type="button" onClick={onClick}>
      <img src={refreshSvg} alt="refresh" width="20px" />
    </button>
  );
}
