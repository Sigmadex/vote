import { useState } from 'react';
import { ethers } from 'ethers';
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

const ConnectButton = () => { // pass walletAddress from parent (App.js, use Provider?)
  const [walletAddress, setWalletAddress] = useState('')

  async function requestAccount() {
    console.log('Requesting account')

    if (window.ethereum) {
      console.log('detected ethereum')

      try {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts'
        });
        setWalletAddress(accounts[0])
        storeWalletAddress(accounts[0])
      } catch (error) {
        console.log(error)
      }

    } else {
      alert('Metamask is required for signing in')
    }
  }

  function storeWalletAddress(walletAddress) {
    localStorage.setItem('walletAddess', walletAddress)
  }

  async function connectWallet() {
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount()

      const provider = new ethers.providers.Web3Provider(window.ethereum)
    }
  }

  return (
    walletAddress
      ? <span style={{color: '#ffffff'}}>{truncateAddress(walletAddress)}</span>
      : <button
          onClick={() => requestAccount()}
          style={buttonStyles}
        >
          Connect Wallet
        </button>
  )
}

export default ConnectButton;
