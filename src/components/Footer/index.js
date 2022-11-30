const currentYear = () => new Date().getFullYear()

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
      &copy; {currentYear()}<a href='https://sigmadex.org/' style={{marginLeft: 5, color: '#404C55', textDecoration: 'none'}}>Sigma Labs</a>
    </div>
  );
}

export default Footer;