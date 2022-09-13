import { useState, useEffect, useContext } from 'react'
import VoteCard from '../VoteCard'
import { ethers } from 'ethers'
import { AddressContext } from '../../utilities/Auth'
import abi from '../../artifacts/contracts/Keyboards.sol/Keyboards.json'

const VotePortal2 = ({connectAccount}) => {
  const [ethereum, setEthereum] = useState(undefined)
  const walletAddress = useContext(AddressContext)
  const contractAddress = process.env.REACT_APP_KEYBOARD_CONTRACT_ADDRESS
  const contractABI = abi.abi
  const [keyboards, setKeyboards] = useState([])

  const getConnectedAccount = async () => {
    if (window.ethereum) {
      setEthereum(window.ethereum)
    }

    // if (ethereum) {
    //   const accounts = await ethereum.request({ method: 'eth_accounts' })
    //   handleAccounts(accounts)
    // }
  }

  useEffect(() => {
    getConnectedAccount()
  }, [])

  const getKeyboards = async () => {
    if (ethereum && walletAddress) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      console.log(contractAddress)
      const keyboardsContract = new ethers.Contract(contractAddress, contractABI, signer);
      const keyboards = await keyboardsContract.getKeyboards();
      console.log('Retrieved keyboards...', keyboards)
      setKeyboards(keyboards)
    }
  }

  // MARK: - Runs when walletAddress is set in AddressContext
  useEffect(() => {
    getKeyboards()
  }, [walletAddress])

  let testProposal = {
    id: 'SEP-002',
    subject: 'Launch Strategy',
    link: 'https://sigmadex.org/',
    options: [
      {
        optionName: 'A',
        optionDescription: ''
      },
      {
        optionName: 'B',
        optionDescription: ''
      },
      {
        optionName: 'C',
        optionDescription: ''
      }
    ]
  }

  return (
    <div style={{paddingTop: '266px', paddingBottom: '266px'}}>
      <VoteCard proposal={testProposal} connectAccount={connectAccount} />
    </div>
  );
}

export default VotePortal2;
