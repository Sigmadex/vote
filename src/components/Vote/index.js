import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import ConnectButton from '../ConnectButton'
import { ethers } from 'ethers'
import abi from '../../artifacts/contracts/Keyboards.sol/Keyboards.json'

function VotePortal() {
  const [ethereum, setEthereum] = useState(undefined);
  const [connectedAccount, setConnectedAccount] = useState(undefined);
  const [keyboards, setKeyboards] = useState([])
  // const [contractAddress, setContractAddress] = useState(undefined);
  const contractAddress = process.env.REACT_APP_KEYBOARD_CONTRACT_ADDRESS;
  const contractABI = abi.abi;

  const handleAccounts = (accounts) => {
    if (accounts.length > 0) {
      const account = accounts[0];
      console.log('We have an authorized account: ', account);
      setConnectedAccount(account);
    } else {
      console.log("No authorized accounts yet")
    }
  };

  const getConnectedAccount = async () => {
    if (window.ethereum) {
      setEthereum(window.ethereum);
    }

    if (ethereum) {
      const accounts = await ethereum.request({ method: 'eth_accounts' });
      handleAccounts(accounts);
    }
  };

  // useEffect(() => getConnectedAccount(), []);

  useEffect(() => {
    // async function fetchData() {
    //   const response = await MyAPI.getData(someId)
    // }

    async function getConnectedAccount() {
      if (window.ethereum) {
        setEthereum(window.ethereum)
      }

      if (ethereum) {
        // alert('foo')
        const accounts = await ethereum.request({ method: 'eth_accounts' })
        handleAccounts(accounts)

      }

      // const accounts = await ethereum.request({ method: 'eth_accounts' })
      // handleAccounts(accounts)
    }

    getConnectedAccount()
  }, [])

  const connectAccount = async () => {
    if (!ethereum) {
      alert('MetaMask is required to connect an account');
      return;
    }

    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    handleAccounts(accounts);
  };

  // const getKeyboards = async () => {
  //   if (ethereum && connectedAccount) {
  //     const provider = new ethers.providers.Web3Provider(ethereum);
  //     const signer = provider.getSigner();
  //     const keyboardsContract = new ethers.Contract(contractAddress, contractABI, signer);
  //
  //     const keyboards = await keyboardsContract.getKeyboards();
  //     console.log('Retrieved keyboards...', keyboards)
  //     setKeyboards(keyboards)
  //   }
  // }
  //
  // useEffect(() => getKeyboards(), [connectedAccount])

  useEffect(() => {
    // async function fetchData() {
    //   const response = await MyAPI.getData(someId)
    // }

    async function getKeyboards() {
      if (ethereum && connectedAccount) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        console.log(contractAddress)
        const keyboardsContract = new ethers.Contract(contractAddress, contractABI, signer);

        const keyboards = await keyboardsContract.getKeyboards();
        console.log('Retrieved keyboards...', keyboards)
        setKeyboards(keyboards)
      }
    }

    getKeyboards()
  }, [connectedAccount])

  if (!ethereum) {
    return <p>Please install MetaMask to connect to this site</p>
  }

  if (!connectedAccount) {
    return <button onClick={connectAccount}>Connect MetaMask Wallet</button>
  }

  return (
    <div>
      <h1>Vote Portal</h1>
      <div>{keyboards.map((keyboard, i) => <p key={i}>{keyboard}</p>)}</div>
    </div>
  )
}

export default VotePortal
