import { useContext } from 'react'
import { AddressContext } from '../../utilities/Auth'
import { truncateAddress } from '../../utilities/formatting'

const buttonStyles = {
  width: '150px',
  height: '46px',
  border: '1px solid #404C55',
  borderRadius: '10px',
  backgroundColor: 'transparent',
  fontSize: '14px',
  fontWeight: '600',
  cursor: 'pointer',
  color: '#404C55',
}
// if button is used in Navbar component, apply these styles
const navbarButtonStyles = {
  width: '138px',
  height: '36px',
  border: '1px solid rgba(255, 255, 255, 0.5)',
  borderRadius: '10px',
  backgroundColor: 'transparent',
  fontSize: '14px',
  fontWeight: '600',
  cursor: 'pointer',
  color: '#ffffff'
}

const ConnectButton = ({connectAccount, navbar}) => {
  const walletAddress = useContext(AddressContext)

  return (
    walletAddress
      ? navbar
        ? <span style={{color: '#ffffff'}}>{truncateAddress(walletAddress)}</span>
        : <button
            style={{...buttonStyles, cursor: 'not-allowed'}}
            disabled={true}
          >
            Connect Wallet
          </button>
      : <button
          onClick={connectAccount}
          style={navbar ? navbarButtonStyles: buttonStyles}
        >
          Connect Wallet
        </button>
  )
}

export default ConnectButton;