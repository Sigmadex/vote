import { useState, useEffect } from 'react'
import './App.css';
import Navbar from '../Navbar'
import VotePortal from '../VotePortal'
import Test from '../Test'
import Proposal from '../Proposal'
import Footer from '../Footer'
import Dapp from '../Dapp'
// import Vault from '../Vault'
// import Ballot from '../Ballot'
// import Charts from '../Charts'
// import Onboarding from '../Onboarding'
// import Vote from '../Vote'
import { Routes, Route } from 'react-router-dom'
import { AddressContext } from '../../utilities/Auth'

// const Home = () => {
//   return (
//     <div style={{textAlign: 'center'}}>
//       <Link to='/vote'>Vote</Link>
//       <Link to='/test'>Test</Link>
//       <Link to='/proposal'>Proposal</Link>
//     </div>
//   )
// }

const App = () => {
  const [walletAddress, setWalletAddress] = useState(null)
  const [ethereum, setEthereum] = useState(undefined)
  const [connectedAccount, setConnectedAccount] = useState(undefined)

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
        <Route index element={<VotePortal connectAccount={connectAccount} />} />
        <Route path='/test' element={<Test />} />
        <Route path='/proposal' element={<Proposal />} />
        <Route path='/dapp' element={<Dapp />} />
        <Route path='*' element={<h1>404</h1>} />
      </Routes>
      <Footer />
    </AddressContext.Provider>
  );
}

export default App;
