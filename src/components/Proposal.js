import { useState, useEffect, useContext } from 'react';
import { ethers } from 'ethers'
import { AddressContext } from '../utilities/Auth'
const abi = [
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

const Proposal = () => {
  const [votes, setVotes] = useState([])
  const walletAddress = useContext(AddressContext)
  const [proposals, setProposals] = useState({})
  // const [proposals2, setProposals2] = useState([])
  let proposals2 = []
  // const contractAddress = process.env.REACT_APP_KEYBOARD_CONTRACT_ADDRESS
  const contractAddress = "0x7aE2B1162444456894C3711bBECCEf207Facd790"

  const getVotes = () => {
    if (walletAddress) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(contractAddress, abi, provider); // address for smart contract

      let proposal0 = contract.proposals(0);
      proposal0.then(function(result) {
          setProposals({...proposals, [result.name]: parseInt(result.voteCount._hex, 16)})
          proposals2.push([result.name, parseInt(result.voteCount._hex, 16)])
          document.getElementById("proposal0name").innerHTML = result[0]
          document.getElementById("vote0count").innerHTML = result[1]
      })
      let proposal1 = contract.proposals(1);
      proposal1.then(function(result) {
          setProposals({...proposals, [result.name]: parseInt(result.voteCount._hex, 16)})
          proposals2.push([result.name, parseInt(result.voteCount._hex, 16)])
          document.getElementById("proposal1name").innerHTML = result[0]
          document.getElementById("vote1count").innerHTML = result[1]
      })
      let proposal2 = contract.proposals(2);
      proposal2.then(function(result) {
          setProposals({...proposals, [result.name]: parseInt(result.voteCount._hex, 16)})
          proposals2.push([result.name, parseInt(result.voteCount._hex, 16)])
          document.getElementById("proposal2name").innerHTML = result[0]
          document.getElementById("vote2count").innerHTML = result[1]
      })
    }
    console.log(proposals)
    console.log(proposals2)
  }

  useEffect(() => {
    getVotes()
  }, [walletAddress])

  function vote() {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      // MetaMask requires requesting permission to connect users accounts
      provider.send("eth_requestAccounts", []);

      // The MetaMask plugin also allows signing transactions to
      // send ether and pay to change state within the blockchain.
      // For this, you need the account signer...
      const signer = provider.getSigner()
      const contract = new ethers.Contract(contractAddress, abi, signer);

      let proposalVal = document.getElementById("ProposalSelect").value
      let castVote = contract.vote(proposalVal)
  }

  function delegate() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner()
    const contract = new ethers.Contract(contractAddress, abi, signer);
    let addressVal = document.getElementById("txtaddress").value
    let delegatevote = contract.delegate(addressVal)
  }

  function canUserVote(address = '0x7aE2B1162444456894C3711bBECCEf207Facd790') {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner()
    // const contract = new ethers.Contract(contractAddress, abi, signer);
    const contract = new ethers.Contract(contractAddress, abi, provider)
    // await contract.totalAllocPoint()
    // let voters = contract.voters()
    // let voter = contract.voters
    // let voters = contract.methods.voters().call()
    // // let voter = contract.voters[1]
    // console.log(voters)
  }

  return (
    <div>
      <h1>Proposal</h1>
      <button onClick={getVotes}>Get votes</button>
      <button onClick={canUserVote}>Can this address vote?</button>

      <div className="container">
          <h1>Voting DApp</h1>
          <div className="table-responsive">
              <table className="table table-bordered">
                  <thead>
                      <tr>
                          <th>Candidate</th>
                          <th>Votes</th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr>
                          <td id="proposal0name"></td>
                          <td id="vote0count"></td>
                      </tr>
                      <tr>
                          <td id="proposal1name"></td>
                          <td id="vote1count"></td>
                      </tr>
                      <tr>
                          <td id="proposal2name"></td>
                          <td id="vote2count"></td>
                      </tr>
                  </tbody>
              </table>
          </div>

          <select id="ProposalSelect">
              <option value="-1">--Select a proposal to vote--</option>
              <option value="0">Oranges</option>
              <option value="1">Apples</option>
              <option value="2">Mangoes</option>
          </select>
          <input id="Button1" type="button" onClick={vote} className="btn btn-info" value="Vote" />
          {/* Or delegate someone to vote
          <input id="txtaddress" type="text" />
          <input id="Button1" type="button" onClick={delegate} className="btn btn-info" value="Delegate" /> */}
      </div>

    </div>
  );
}

export default Proposal;
