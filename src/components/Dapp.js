import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import TokenArtifact from '../ABI/Ballot.json';
import contractAddress from '../ABI/contract-address.json';
import { parseName, parseBytes } from '../utils';

const Dapp = () => {
  const [token, setToken] = useState();
  const [proposals, setProposals] = useState([]);
  const [chairperson, setChairperson] = useState('');

  async function _initialize() {
    await _intializeEthers();
  }

  const _intializeEthers = async () => {
    // ethers connection for the smartcontract
    const _provider = new ethers.providers.Web3Provider(window.ethereum);
    const _token = new ethers.Contract(
      contractAddress.Token,
      TokenArtifact.abi,
      _provider.getSigner(0)
    );
    // get the proposals
    const newProposal = await _token.getAllProposals();
    // get the chairman address
    const newChairperson = await _token.chairperson();
    // save the token data into a hook to reuse it along the app
    setToken(_token);
    setProposals(newProposal);
    setChairperson(newChairperson);
  };

  // Connects to the smart contract token id (check /contracts/contract-address.json)
  async function init() {
    const [selectedAddress] = await window.ethereum.enable();
    _initialize(selectedAddress);
  }

  useEffect(() => {
    // When the page loads it will initialize the init function
    // that we need to connect the frontend with the smartcontract
    init();
  }, []);

  const voteProposal = async (proposal) => {
    await token.vote(proposal);
  };
    
  return (
    <div style={{ padding: '3rem 5rem' }}>
      <h1>Voting System</h1>
      <div>
        <h4>chairperson: {chairperson}</h4>
      </div>
      <div>
        <h4>proposal:</h4>{' '}
        {proposals.map((proposal, index) => {
          const name = parseName(parseBytes(proposal.name));
          const voteCount = proposal.voteCount._hex;
          return (
            <div key={index} style={{ padding: '1rem 0' }}>
              🗳 {name} - {Number(voteCount)}
              <button
                style={{ marginLeft: '2em' }}
                onClick={() => voteProposal(index)}
              >
                Vote
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Dapp;