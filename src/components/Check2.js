import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import contractAddress from '../ABI/contract-address'
import TokenArtifact from '../ABI/Ballot'

const Check2 = () => {
  const [token, setToken] = useState(undefined)
  const [voterAddressToCheck, setVoterAddressToCheck] = useState('0x1F918574c45199DD8d6dBb0B2975e5859A4bB512')
  const [voterStatus, setVoterStatus] = useState()

  /* automatically triggers when token is defined */
  useEffect(() => {
    checkAddressVoter('0x29bcDdA82173dC481b0F03ab06898091c2498634')
  }, [token])

  const checkAddressVoter = async (address) => {
    // console.log('checking status for', address)
    try {
      const voterData = await token.voters(address);
      setVoterStatus(voterData);
    } catch (err) {
      console.log(err);
      setVoterStatus('An error has occured');
    }
  };

  async function _initialize() {
    await _intializeEthers();
  }

  const _intializeEthers = async () => {
    const _provider = new ethers.providers.Web3Provider(window.ethereum);
    const _token = new ethers.Contract(
      contractAddress.Token,
      TokenArtifact.abi,
      _provider.getSigner(0)
    );
    setToken(_token);
  };  

  async function init() {
    const [selectedAddress] = await window.ethereum.enable();
    _initialize(selectedAddress);
  }

  useEffect(() => {
    init();
  }, []);  

  return (
    <div>
      <h1>Check 2</h1>
      <h3>Checking if {voterAddressToCheck} has voted</h3>
      {voterStatus?.voted
        ? <h3>Already Voted, Show Results</h3>
        : <h3>Not Voted, Select Proposal</h3>}
    </div>
  )
};

export default Check2