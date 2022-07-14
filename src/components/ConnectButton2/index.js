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
  cursor: 'pointer',
  color: '#404C55',
  // display: 'flex',
  // flexDirection: 'column',
  // justifyContent: 'center',
  // alignItems: 'center',
  // padding: '0px'
}

const ConnectButton2 = ({connectAccount}) => {
  const walletAddress = useContext(AddressContext)

  return (
    walletAddress
      ? <span style={{color: '#ffffff'}}>{truncateAddress(walletAddress)}</span>
      : <button
          onClick={connectAccount}
          style={buttonStyles}
        >
          Connect Wallet
        </button>
  )
}

export default ConnectButton2;
