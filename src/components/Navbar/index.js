import React from 'react';
import ConnectButton from '../ConnectButton'

const Logo = () => <img alt='Sigmadex logo' src='/images/Sigmadex-logo.svg' />

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
