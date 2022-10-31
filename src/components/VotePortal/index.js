import { useState, useEffect, useContext } from 'react'
import VoteCard from '../VoteCard'
import { ethers } from 'ethers'
import { AddressContext } from '../../utilities/Auth'
import abi from '../../artifacts/contracts/Keyboards.sol/Keyboards.json'
import TokenArtifact from '../../ABI/Ballot.json';
import contractAddress from '../../ABI/contract-address.json';

const VotePortal = ({connectAccount}) => {
  const [ethereum, setEthereum] = useState(undefined)
  const walletAddress = useContext(AddressContext)
  // const contractAddress = process.env.REACT_APP_KEYBOARD_CONTRACT_ADDRESS // deprecated
  const contractABI = abi.abi
  const [keyboards, setKeyboards] = useState([])
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
    // const [selectedAddress] = await window.ethereum.enable(); // deprecated
    // if (window.ethereum) {
    //   try {
        const selectedAddress = await window.ethereum.request({ method: 'eth_requestAccounts' });
        _initialize(selectedAddress);
    //   } catch (error) {
    //     if (error.code === 4001) {
    //       // User rejected request
    //     }
    
    //     setError(error);
    //   }
    // }
  }

  useEffect(() => {
    // When the page loads it will initialize the init function
    // that we need to connect the frontend with the smartcontract
    init();
  }, []);

  const voteProposal = async (proposal) => {
    // console.log('voting for', proposal)
    await token.vote(proposal);
  };

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

  // const getKeyboards = async () => {
  //   if (ethereum && walletAddress) {
  //     const provider = new ethers.providers.Web3Provider(ethereum);
  //     const signer = provider.getSigner();
  //     console.log(contractAddress)
  //     const keyboardsContract = new ethers.Contract(contractAddress, contractABI, signer);
  //     const keyboards = await keyboardsContract.getKeyboards();
  //     console.log('Retrieved keyboards...', keyboards)
  //     setKeyboards(keyboards)
  //   }
  // }

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

  let proposals3 = []

  return (
    <div style={{paddingTop: '266px', paddingBottom: '266px'}}>
      <VoteCard proposal={testProposal} connectAccount={connectAccount} proposals3={proposals} voteProposal={voteProposal} />
      {/* {proposals.map((proposal, index) => {
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
        })}       */}
    </div>
  );
}

export default VotePortal;
