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
  // const [chairperson, setChairperson] = useState('')
  const [voterStatus, setVoterStatus] = useState()

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

  async function _initialize() { // MARK: - redundant?
    await _intializeEthers()
  }

  const _intializeEthers = async () => {
    // ethers connection for the smartcontract
    const _provider = new ethers.providers.Web3Provider(window.ethereum)
    const _token = new ethers.Contract(
      contractAddress.Token,
      TokenArtifact.abi,
      _provider.getSigner(0)
    )
    // get the proposals
    const newProposal = await _token.getAllProposals()
    // get the chairman address
    // const newChairperson = await _token.chairperson()
    // save the token data into a hook to reuse it along the app
    setToken(_token)
    setProposals(newProposal)
    // setChairperson(newChairperson)
  }

  useEffect(() => {
    // When the page loads it will initialize the init function
    // that we need to connect the frontend with the smartcontract
    if (walletAddress) {
      init()
    }
  }, [walletAddress])  

  const voteProposal = async (proposal) => {
    // console.log('voting for', proposal)
    await token.vote(proposal)
  }

  const checkAddressVoter = async (address) => {
		try {
			const voterData = await token.voters(address)
			setVoterStatus(voterData)
		} catch (err) {
			console.log(err)
			setVoterStatus('An error has occured')
		}    
  }

  /* automatically triggers when token is defined */
  useEffect(() => {
    if (token) { // if (ethereum && token)
      checkAddressVoter(walletAddress)
    }
  }, [token])

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