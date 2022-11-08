import { useState, useEffect, useContext } from 'react'
import { AddressContext } from '../utilities/Auth'
import { ethers } from 'ethers'
import TokenArtifact from '../ABI/Ballot.json'
import contractAddress from '../ABI/contract-address.json'

const Test = () => {
  const walletAddress = useContext(AddressContext) //
  const [token, setToken] = useState() //
  const [voterStatus, setVoterStatus] = useState() //

  useEffect(() => { //
    if (walletAddress) {
      init()
    }
  }, [walletAddress])

  async function init() { //
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
  
  async function _initialize() { //
    await _intializeEthers()
  }
  
  const _intializeEthers = async () => { //
    const _provider = new ethers.providers.Web3Provider(window.ethereum)
    const _token = new ethers.Contract(contractAddress.Token, TokenArtifact.abi, _provider.getSigner(0))
    setToken(_token)
  }      

  useEffect(() => { // 
    if (token) { // if (ethereum && token)
      checkAddressVoter(walletAddress)
    }
  }, [token])

  const checkAddressVoter = async (address) => { //
		try {
			const voterData = await token.voters(address)
			setVoterStatus(voterData)
		} catch (err) {
			console.log(err)
			setVoterStatus('An error has occured')
		}    
  }

  return (
    <div>
      <h3>Test</h3>
      <h5>Current address: {walletAddress}</h5>
      {/* {voterStatus && <h1>👍</h1>} */}
      {voterStatus && voterStatus.voted
        ? <h3>Already Voted, Show Results</h3>
        : <h3>Not Voted, Select Proposal</h3>}
    </div>
  )
}

export default Test