import { useState, useEffect, useContext } from 'react'
import VoteCard from '../VoteCard'
import { ethers } from 'ethers'
import { AddressContext } from '../../utilities/Auth'
import TokenArtifact from '../../ABI/Ballot.json' // can we reference this from ABI folder? (e.g. import abi from '../../artifacts/contracts/Keyboards.sol/Keyboards.json')
import contractAddress from '../../ABI/contract-address.json'

const VotePortal = ({connectAccount}) => {
  let walletAddress = useContext(AddressContext)
  const [token, setToken] = useState()
  const [proposals, setProposals] = useState([])
  const [voterStatus, setVoterStatus] = useState()
  // const [chairperson, setChairperson] = useState('')

  useEffect(() => {
    init()
  }, [])

  async function init() { 
    if (window.ethereum) {
      try {
        _initialize()
      } catch (error) {
        if (error.code === 4001) {
          // User rejected request
        }    
      }
    }
  }

  async function _initialize() { 
    await _initializeEthers()
  }

  const _initializeEthers = async () => { 
    const _provider = new ethers.providers.Web3Provider(window.ethereum)
    const _token = new ethers.Contract(contractAddress.Token, TokenArtifact.abi, _provider.getSigner(0))
    const newProposal = await _token.getAllProposals()
    setToken(_token)
    setProposals(newProposal)
  }

  // useEffect(() => {
  // }, [token])

  useEffect(() => {
    if (walletAddress) {
      checkAddressVoter(walletAddress)
    }
  }, [walletAddress])

  const checkAddressVoter = async (address) => {
    try {
      const voterStatus = await token.voters(address)
      setVoterStatus(voterStatus)
    } catch (err) {
      console.log(err)
      // setVoterStatus('An error has occured')
    }
  }

  useEffect(() => {
    if (voterStatus) {
      let hasVoted = voterStatus.voted ? 'true' : 'false'
      let voterWeight = Number(voterStatus.weight._hex)
      console.log('has voted?', hasVoted)
      console.log('voter weight', voterWeight)
    }
  }, [voterStatus])

  const voteProposal = async (proposal) => {
    // console.log('voting for', proposal)
    await token.vote(proposal)
    // reload proposals here by checking voterStatus after vote
  }    

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
      <VoteCard 
        walletAddress={walletAddress}
        testProposal={testProposal} 
        connectAccount={connectAccount} 
        proposals={proposals} 
        voteProposal={voteProposal} 
        voterStatus={voterStatus}
      />
    </div>
  )
}

export default VotePortal