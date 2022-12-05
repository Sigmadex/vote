import { useState, useEffect } from 'react'
import './App.css';
import Navbar from '../Navbar'
import VotePortal from '../VotePortal'
import Footer from '../Footer'
import Test from '../Test'
import Admin from '../Admin'
import { Routes, Route } from 'react-router-dom'
import { AddressContext } from '../../utilities/Auth'

const App = () => {
  const [walletAddress, setWalletAddress] = useState(null)
  const [ethereum, setEthereum] = useState(undefined)

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
      setWalletAddress(account);
    } else {
      console.log("No authorized accounts yet")
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      setEthereum(window.ethereum)
    }
  }, [])

  // const getConnectedAccount = async () => {
  //   if (window.ethereum) {
  //     setEthereum(window.ethereum)
  //   }
  //   if (ethereum) {
  //     const accounts = await ethereum.request({ method: 'eth_accounts' })
  //     handleAccounts(accounts)
  //   }
  // }

  // useEffect(() => {
  //   getConnectedAccount()
  // }, [ethereum])

  return (
    // can also set window.ethereum to context (although walletAddress implies window.ethereum)
    <AddressContext.Provider value={walletAddress}> 
      <Navbar connectAccount={connectAccount} />
      <Routes>
        <Route index element={<VotePortal connectAccount={connectAccount} />} />
        <Route path='/test' element={<Test connectAccount={connectAccount} />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='*' element={<h1>404</h1>} />
      </Routes>
      <Footer />
    </AddressContext.Provider>
  );
}

export default App;