import React from 'react';

const ConnectButton = () => {
  function openMetamask() {
    alert('Opening Metamask')
  }

  return <button onClick={() => openMetamask()}>Connect Wallet</button>
}

export default ConnectButton;
