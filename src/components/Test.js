import { useState } from 'react';
import { ethers } from 'ethers';
import { truncateAddress } from '../utilities/formatting'

const Test = () => {
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
      } catch (error) {
        console.log(error)
      }

    } else {
      alert('Metamask is required for signing in')
    }
  }

  async function connectWallet() {
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount()

      const provider = new ethers.providers.Web3Provider(window.ethereum)
    }
  }

  return (
    <div className='test-class'>
      {walletAddress
        ? truncateAddress(walletAddress)
        : <button onClick={() => requestAccount()}>Sign In</button>}
    </div>
  );
}

export default Test;
