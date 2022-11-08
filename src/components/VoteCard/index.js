import { useState, useEffect, useContext } from 'react'
import { AddressContext } from '../../utilities/Auth'
import ConnectButton from '../ConnectButton'
import CastVoteButton from '../CastVoteButton'
import Modal from '../Modal'
import Charts from '../Charts'
import { parseName, parseBytes } from '../../utils';
import { truncateAddress } from '../../utilities/formatting'

const cardStyles = {
  width: '604px',
  height: '492px',
  backgroundColor: '#FFFFFF',
  boxShadow: '0px 4px 25px rgba(64, 76, 85, 0.15)',
  borderRadius: '20px',
  color: '#404C55' // add to universal styles
}

const pollStyles = {
  width: '604px',
  height: '304px',
  backgroundColor: '#FFFFFF',
  boxShadow: '0px 4px 25px rgba(64, 76, 85, 0.15)',
  borderRadius: '20px',
  color: '#404C55'
}

const optionButtonStyles = {
  fontFamily: 'Work Sans',
  width: '142px',
  height: '109px',
  background: '#FFFFFF',
  border: '1px solid #B3BEC6',
  boxShadow: '0px 4px 20px rgba(166, 194, 215, 0.3)',
  borderRadius: '20px',
  cursor: 'pointer',
  color: '#404C55'
}

const disabledOptionButtonStyles = {
  fontFamily: 'Work Sans',
  width: '142px',
  height: '109px',
  background: '#ECF2F5',
  borderStyle: 'none',
  boxShadow: '0px 4px 20px rgba(166, 194, 215, 0.3)',
  borderRadius: '20px',
  cursor: 'not-allowed',
  color: '#B3BEC6'
}

function VoteCard({testProposal, connectAccount, proposals, voteProposal, voterStatus}) {
  const walletAddress = useContext(AddressContext)
  const [selectedOption, setOption] = useState(undefined)
  const [hasVoted, displayPoll] = useState(true)
  // console.log(proposals)
  // const [proposals, setProposals] = useState([['X', ''], ['Y', ''], ['Z', '']])

  function castVote() {
    if (selectedOption !== undefined) {
      // console.log('casting vote for', selectedOption)
      voteProposal(selectedOption)
      // displayPoll(true)
    } else {
      alert('Please select an option')
    }
  }

  return (
    <div style={{textAlign: 'center', fontSize: '14px'}}>
      <img
        // style={{width: '468px', height: '266px'}}
        alt='Pixel Guys'
        src='/images/pixel-guys.svg'
      />
      {voterStatus?.voted 
        /* Polls */
        ? <div style={pollStyles}>
            <div style={{fontSize: '38px', fontWeight: '700', paddingTop: 38, marginBottom: 24}}>
              Vote Portal
            </div>
            <div style={{marginBottom: 32}}>
              Your vote has been recorded on chain.
            </div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
              <div style={{width: 462}}>
                <Charts proposals={proposals} />
              </div>
            </div>
          </div>
        /* Voting */
        : <div>
            <div style={cardStyles}>
              <div style={{fontSize: '38px', fontWeight: '700', paddingTop: 38, marginBottom: 24}}>
                Vote Portal
              </div>
            <div style={{marginBottom: 14}}>
              {walletAddress
                ? 'Select one of the three options below and submit your vote.'
                : 'Connect your wallet to see if you qualify for voting.'}
            </div>
            <div style={{display: 'flex', justifyContent: 'center', marginBottom: 27}}>
              <div style={{width: 354}}>
                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 6}}>
                  <span>
                    Proposal ID:
                  </span>
                  <span style={{fontWeight: '700'}}>
                    {testProposal.id}
                  </span>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 6}}>
                  <span>
                    RE:
                  </span>
                  <span style={{fontWeight: '700'}}>
                    {testProposal.subject}
                  </span>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 3}}>
                  <span>
                    Forum Link:
                  </span>
                  <span style={{fontWeight: '700'}}>
                    <a style={{textDecoration: 'none', color: 'inherit'}} href={testProposal.link}>View</a>
                  </span>
                </div>
              </div>
            </div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
              <div style={{width: 499, display: 'flex', justifyContent: 'space-between', marginBottom: 34}}>
                {/* {proposals.map((proposal, i) =>
                  <button
                    key={i}
                    style={walletAddress ? optionButtonStyles : disabledOptionButtonStyles}
                    disabled={!walletAddress}
                    onClick={() => setOption(i)}
                  >
                    <span style={{fontWeight: '700', fontSize: '14px', display: 'block', marginTop: 8, marginBottom: -4}}>Option</span>
                    <span style={{fontWeight: '700', fontSize: '40px', display: 'block'}}>{proposal[0]}</span>
                  </button>
                )} */}
                {proposals.map((proposal, index) => {
                  const name = parseName(parseBytes(proposal.name))
                  return (
                    <button
                      key={index}
                      style={walletAddress ? optionButtonStyles : disabledOptionButtonStyles}
                      disabled={!walletAddress}
                      onClick={() => setOption(index)}
                    >
                      <span style={{fontWeight: '700', fontSize: '14px', display: 'block', marginTop: 8, marginBottom: -4}}>Option</span>
                      <span style={{fontWeight: '700', fontSize: '40px', display: 'block'}}>{truncateAddress(name)}</span>
                    </button>
                  )
                })}                  
              </div>
            </div>
            <div>
              {walletAddress
                ? <CastVoteButton castVote={castVote} />
                : <ConnectButton connectAccount={connectAccount} />}
            </div>
            <Modal text={'This wallet does not hold a vote NFT.'} display={false} />
          </div>
        </div>}
    </div>
  )
}

export default VoteCard