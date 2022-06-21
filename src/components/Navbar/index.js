import React from 'react';

const Logo = () => <img alt='Sigmadex logo' src='/images/Sigmadex-logo.svg' />

const ConnectButton = () => {
  function openMetamask() {
    alert('Opening Metamask')
  }

  return <button onClick={() => openMetamask()}>Connect Wallet</button>
}

const Header = () => {
  return (
    <>
      <Logo />
      <img alt='AVAX logo' src='/images/avax-logo-white.svg' />
      <ConnectButton />
    </>
  );
}

export default Header;
