import ConnectButton from '../ConnectButton'
import { AddressContext } from '../../utilities/Auth'

const Logo = () => <img style={{cursor: 'pointer'}} alt='Sigmadex logo' src='/images/Sigmadex-logo.svg' />
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
