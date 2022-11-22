import { useState, useEffect, useContext } from 'react'
import { ethers } from 'ethers'
import TokenArtifact from '../ABI/Ballot.json'
import contractAddress from '../ABI/contract-address.json'
import { parseName, parseBytes } from '../utils'
import { AddressContext } from '../utilities/Auth'
import ConnectButton from './ConnectButton'

const Test = ({connectAccount}) => {
  const walletAddress = useContext(AddressContext)
  const [token, setToken] = useState()
  const [proposals, setProposals] = useState([])
  const [voterStatus, setVoterStatus] = useState()

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
    await _intializeEthers()
  }

  const _intializeEthers = async () => { 
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

  return (
    <div>
      <h1>Test</h1>
      <ul>
        {walletAddress && voterStatus && Number(voterStatus.weight._hex) > 0
          ? voterStatus.voted
            ? <h1>Polls</h1>
            : proposals.map((proposal, index) => {
                const name = parseName(parseBytes(proposal.name))
                return (
                  <li key={index}>
                    <button>{name}</button>
                  </li>
                )
              })
          : proposals.map((proposal, index) => {
              const name = parseName(parseBytes(proposal.name))
              return (
                <li key={index}>
                  <button disabled={true}>{name}</button>
                </li>
              )
            })}
      </ul>
      <ConnectButton connectAccount={connectAccount} />
    </div>
  )
}

export default Test