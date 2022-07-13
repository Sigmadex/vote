import { useContext, useState } from 'react'
import { ethers } from 'ethers'
import { AddressContext } from '../../utilities/Auth'
import { truncateAddress } from '../../utilities/formatting'

const buttonStyles = {
  width: '138px',
  height: '36px',
  border: '1px solid rgba(255, 255, 255, 0.5)',
  borderRadius: '10px',
  backgroundColor: 'transparent',
  fontSize: '14px',
  cursor: 'pointer',
  color: '#ffffff'
}

const ConnectButton = ({connectAccount}) => {
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

export default ConnectButton;
