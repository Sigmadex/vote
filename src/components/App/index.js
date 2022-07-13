import { createContext, useState, useEffect, useContext } from 'react'
import './App.css';
import Navbar from '../Navbar'
import Vault from '../Vault'
import Vote from '../Vote'
import Test from '../Test'
import StickyFooter from '../StickyFooter'
import Footer from '../Footer'
import { Routes, Route, Link } from 'react-router-dom'
import { ethers } from 'ethers'
import { AddressContext } from '../../utilities/Auth'

const Home = () => {
  return (
    <div>
      <Link to='/vote'>Vote</Link>
      <Link to='/vault'>Vault</Link>
    </div>
  )
}

const App = () => {
  const [walletAddress, setWalletAddress] = useState(null)
  const [ethereum, setEthereum] = useState(undefined)
  const [connectedAccount, setConnectedAccount] = useState(undefined)
  const [testVariable, setTestVariable] = useState('yolo')

  const connectAccount = async () => {
    if (!ethereum) {
      alert('MetaMask is required to connect an account');
      return;
    }

    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    handleAccounts(accounts);
  };

  const handleAccounts = (accounts) => {
    if (accounts.length > 0) {
      const account = accounts[0];
      console.log('We have an authorized account: ', account);
      setConnectedAccount(account);
      setWalletAddress(account);
    } else {
      console.log("No authorized accounts yet")
    }
  };

  const getConnectedAccount = async () => {
    if (window.ethereum) {
      setEthereum(window.ethereum)
    }

    if (ethereum) {
      const accounts = await ethereum.request({ method: 'eth_accounts' })
      handleAccounts(accounts)
    }
  }

  useEffect(() => {
    getConnectedAccount()
  }, [])

  return (
    <AddressContext.Provider value={walletAddress}>
      <Navbar connectAccount={connectAccount} />
      <Routes>
        <Route index element={<Home />} />
        <Route path='/vault' element={<Vault />} />
        <Route path='/vote' element={<Vote />} />
        <Route path='/test' element={<Test />} />
        <Route path='*' element={<h1>404</h1>} />
      </Routes>
      <Footer />
    </AddressContext.Provider>
  );
}

export default App;
