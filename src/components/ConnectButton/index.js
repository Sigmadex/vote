import React from 'react';

const buttonStyles = {
  width: '138px',
  height: '36px',
  border: '1px solid rgba(255, 255, 255, 0.5)',
  borderRadius: '10px',
  backgroundColor: 'transparent',
  fontSize: '14px',
  cursor: 'pointer',
  color: '#ffffff'
}

const ConnectButton = () => {
  function openMetamask() {
    alert('Opening Metamask')
  }

  return (
    <button
      onClick={() => openMetamask()}
      style={buttonStyles}
    >
      Connect Wallet
    </button>
  )
}

export default ConnectButton;
