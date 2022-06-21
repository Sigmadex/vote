import React from 'react';

const currentYear = () => new Date().getFullYear()

const userAddress = () => '154869129'

const Footer = () => {
  return (
    <>
      &copy; {currentYear()} Sigmadex
      {userAddress()}
      <img alt='block' src='/images/block.svg' />
    </>
  );
}

export default Footer;
