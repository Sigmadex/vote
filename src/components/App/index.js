import { createContext, useState, useEffect, useContext } from 'react'
import './App.css';
import Navbar from '../Navbar'
import Vault from '../Vault'
import Vote from '../Vote'
import Test from '../Test'
import StickyFooter from '../StickyFooter'
import Footer from '../Footer'
// import Alert from '../Alert'
import { Routes, Route, Link } from 'react-router-dom'
import { ethers } from 'ethers'

import { AddressProvider } from './AddressProvider'

// import { AddressProvider } from '../../utilities/Auth'
//
// const AddressContext = createContext(null)
//
// const AddressProvider = ({ value, children }) => {
//   return (
//     <AddressContext.Provider value={value}>
//       {children}
//     </AddressContext.Provider>
//   )
// }

const Home = () =>
  <div>
    <Link to='/vote'>Vote</Link>
    <Link to='/vault'>Vault</Link>
  </div>

const App = () => {
  const [walletAddress, setWalletAddress] = useState(null)
  const [ethereum, setEthereum] = useState(undefined)
  const [connectedAccount, setConnectedAccount] = useState(undefined)

  const handleAccounts = (accounts) => {
    if (accounts.length > 0) {
      const account = accounts[0];
      console.log('We have an authorized account: ', account);
      // setConnectedAccount(account);
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

  const connectAccount = async () => {
    if (!ethereum) {
      alert('MetaMask is required to connect an account');
      return;
    }

    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    handleAccounts(accounts);
  };

  // if (!ethereum) {
  //   return <p>Please install MetaMask to connect to this site</p>
  // }

  // if (!connectedAccount) {
  // if (!walletAddress) {
  //   return <button onClick={connectAccount}>Connect MetaMask Wallet</button>
  // }

  return (
    // <AddressProvider value={walletAddress}>
    <AddressProvider>
      {/* <Alert /> */}
      <Navbar />

      <Routes>
        <Route index element={<Home />} />
        <Route path='/vault' element={<Vault />} />
        <Route path='/vote' element={<Vote />} />
        <Route path='/test' element={<Test />} />
        <Route path='*' element={<h1>404</h1>} />
      </Routes>

      <Footer />
    </AddressProvider>
  );
}

export default App;
