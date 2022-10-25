import { useState, useEffect, useContext } from 'react'
import VoteCard from '../VoteCard'
import { ethers } from 'ethers'
import { AddressContext } from '../../utilities/Auth'
import abi from '../../artifacts/contracts/Keyboards.sol/Keyboards.json'

const proposalABI = [
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "to",
              "type": "address"
          }
      ],
      "name": "delegate",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "voter",
              "type": "address"
          }
      ],
      "name": "giveRightToVote",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
  },
  {
      "inputs": [
          {
              "internalType": "uint256",
              "name": "proposal",
              "type": "uint256"
          }
      ],
      "name": "vote",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [],
      "name": "chairperson",
      "outputs": [
          {
              "internalType": "address",
              "name": "",
              "type": "address"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "name": "proposals",
      "outputs": [
          {
              "internalType": "string",
              "name": "name",
              "type": "string"
          },
          {
              "internalType": "uint256",
              "name": "voteCount",
              "type": "uint256"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "",
              "type": "address"
          }
      ],
      "name": "voters",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "weight",
              "type": "uint256"
          },
          {
              "internalType": "bool",
              "name": "voted",
              "type": "bool"
          },
          {
              "internalType": "address",
              "name": "delegate",
              "type": "address"
          },
          {
              "internalType": "uint256",
              "name": "vote",
              "type": "uint256"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [],
      "name": "winnerName",
      "outputs": [
          {
              "internalType": "string",
              "name": "winnerName_",
              "type": "string"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [],
      "name": "winningProposal",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "winningProposal_",
              "type": "uint256"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  }
]

const VotePortal = ({connectAccount}) => {
  const [ethereum, setEthereum] = useState(undefined)
  const walletAddress = useContext(AddressContext)
  // const contractAddress = process.env.REACT_APP_KEYBOARD_CONTRACT_ADDRESS
  const contractAddress = "0x7aE2B1162444456894C3711bBECCEf207Facd790"
  const contractABI = abi.abi
  const [keyboards, setKeyboards] = useState([])
  const [votes, setVotes] = useState([])
  const [proposals, setProposals] = useState({})
  let proposals2 = []

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
  // useEffect(() => {
  //   getKeyboards()
  // }, [walletAddress])

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

  // const [proposals3, setProposals3] = useState([])
  let proposals3 = []

  const getVotes = async () => {
    if (walletAddress) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(contractAddress, proposalABI, provider); // address for smart contract

      const proposal0 = await contract.proposals(0)
      proposals3.push([proposal0.name, parseInt(proposal0.voteCount._hex, 16)])
      // setProposals3([...proposals3, [proposal0.name, parseInt(proposal0.voteCount._hex, 16)]])

      const proposal1 = await contract.proposals(1)
      proposals3.push([proposal1.name, parseInt(proposal1.voteCount._hex, 16)])
      // setProposals3([...proposals3, [proposal1.name, parseInt(proposal1.voteCount._hex, 16)]])

      const proposal2 = await contract.proposals(2)
      proposals3.push([proposal2.name, parseInt(proposal2.voteCount._hex, 16)])
      // setProposals3([...proposals3, [proposal2.name, parseInt(proposal2.voteCount._hex, 16)]])

      // console.log(proposals3)
    }
  }

  useEffect(() => {
    getVotes()
  }, [walletAddress])

  return (
    <div style={{paddingTop: '266px', paddingBottom: '266px'}}>
      <VoteCard proposal={testProposal} connectAccount={connectAccount} proposals3={proposals3} />
    </div>
  );
}

export default VotePortal;
