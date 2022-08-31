import ConnectButton from '../ConnectButton'
import { AddressContext } from '../../utilities/Auth'
import { Link } from 'react-router-dom'

const Logo = () => {
  return (
    <Link to='/'>
      <img
        style={{cursor: 'pointer', height: '21px'}}
        alt='Sigmadex logo'
        src='/images/logo-E-wht.svg'
      />
    </Link>
  )
}

const navbarStyles = {
  height: '90px',
  // paddingTop: '90px',
  paddingLeft: '36px',
  paddingRight: '36px',
  display: 'flex',
  alignItems: 'center',
  position: 'fixed',
  top: '0px',
  left: '0px',
  right: '0px',
  display: 'flex',
  justifyContent: 'space-between'
}

const Navbar = ({connectAccount}) => {
  return (
    <div style={navbarStyles}>
      <Logo />
      <span>
        <img alt='AVAX logo' src='/images/avax-logo-white.svg' />
        <span style={{paddingLeft: '26px'}}>
          <ConnectButton connectAccount={connectAccount} />
        </span>
      </span>
    </div>
  );
}

export default Navbar;
