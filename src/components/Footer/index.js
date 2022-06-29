import React from 'react';

const currentYear = () => new Date().getFullYear()

const userAddress = () => '154869129'

const footerStyles = {
  backgroundColor: '#ffffff',
  height: '90px',
  paddingLeft: '36px',
  display: 'flex',
  alignItems: 'center',
  position: 'fixed',
  bottom: '0px',
  left: '0px',
  right: '0px'
}

const Footer = () => {
  return (
    <div
      // class={'footer'}
      style={footerStyles}
    >
      &copy; {currentYear()} Sigma Labs
      {/* {userAddress()} */}
      {/* <img alt='block' src='/images/block.svg' /> */}
    </div>
  );
}

export default Footer;
