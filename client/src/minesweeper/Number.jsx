import React from 'react';

const Number = ({ digit }) => {
  const isOne = Math.floor(digit) == 1;
  const style = {
    width:     (isOne && '100%'),
    textAlign: (isOne && 'right')
  };

  return (

    <span className="digit">
      <span className="sdigit">8</span>
      <span style={style}>{Math.floor(digit)}</span>
    </span>
  );
};

export default Number;