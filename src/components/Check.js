import { useState, useEffect } from 'react'
import CheckVoterAddress from "./CheckVoterAddress";
import { ethers } from 'ethers'
import contractAddress from '../ABI/contract-address'
import TokenArtifact from '../ABI/Ballot'

const Check = () => {
  const [token, setToken] = useState()
  const [voterAddressToCheck, setVoterAddressToCheck] = useState('0x1F918574c45199DD8d6dBb0B2975e5859A4bB512')
  const [voterStatus, setVoterStatus] = useState()

  const checkAddressVoter = async () => {
    try {
      const voterData = await token.voters(`${voterAddressToCheck}`);
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
    // const [selectedAddress] = await window.ethereum.enable();
    const selectedAddress = await window.ethereum.request({ method: 'eth_requestAccounts' });
    _initialize(selectedAddress);
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <div>
      <h1>Check</h1>
      <CheckVoterAddress 
        voterAddressToCheck={voterAddressToCheck} 
        setVoterAddressToCheck={setVoterAddressToCheck} 
        checkAddressVoter={checkAddressVoter} 
        voterStatus={voterStatus} 
      />
    </div>
  )
};

export default Check