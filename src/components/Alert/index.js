import React from 'react';

const Alert = ({message = 'This wallet does not hold a vote NFT.'}) => {
  return (
    <h3>{message}</h3>
  );
}

export default Alert;
