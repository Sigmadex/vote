import { useState, useContext } from 'react'
import { AddressContext } from '../../utilities/Auth'
import ConnectButton from '../ConnectButton'
import CastVoteButton from '../CastVoteButton'
import Modal from '../Modal'
import Charts from '../Charts'

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

function VoteCard({proposal, connectAccount}) {
  const walletAddress = useContext(AddressContext)
  const [selectedOption, setOption] = useState(null)
  const [hasVoted, displayPoll] = useState(false)

  function castVote() {
    if (selectedOption) {
      console.log('casting vote for', selectedOption)
      displayPoll(true)
    } else {
      alert('Please select an option')
    }
  }

  // TODO: - Refactor
  if (hasVoted) {
    return (
      <div style={{textAlign: 'center', fontSize: '14px'}}>
        <img
          // style={{width: '468px', height: '266px'}}
          alt='Pixel Guys'
          src='/images/pixel-guys.png'
        />
        <div style={pollStyles}>
          <div style={{fontSize: '38px', fontWeight: '700', paddingTop: 44, marginBottom: 27}}>
            Vote Portal
          </div>
          <div style={{marginBottom: 35}}>
            Your vote has been recorded on chain.
          </div>
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <div style={{width: 462}}>
              <Charts />
            </div>
          </div>

        </div>
      </div>
    )
  }

  return (
    <div style={{textAlign: 'center', fontSize: '14px'}}>
      <img
        // style={{width: '468px', height: '266px'}}
        alt='Pixel Guys'
        src='/images/pixel-guys.png'
      />
      <div>
        <div style={cardStyles}>
          <div style={{fontSize: '38px', fontWeight: '700', paddingTop: 44, marginBottom: 27}}>
            Vote Portal
          </div>
          <div style={{marginBottom: '9px'}}>
            {walletAddress
              ? 'Select one of the three options below and submit your vote.'
              : 'Connect your wallet to see if you qualify for voting.'}
          </div>
          <div style={{display: 'flex', justifyContent: 'center', marginBottom: 27}}>
            <div style={{width: 357}}>
              <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 8}}>
                <span>
                  Proposal ID:
                </span>
                <span style={{fontWeight: '700'}}>
                  {proposal.id}
                </span>
              </div>
              <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 8}}>
                <span>
                  RE:
                </span>
                <span style={{fontWeight: '700'}}>
                  {proposal.subject}
                </span>
              </div>
              <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 8}}>
                <span>
                  Forum Link:
                </span>
                <span style={{fontWeight: '700'}}>
                  <a style={{textDecoration: 'none', color: 'inherit'}} href={proposal.link}>View</a>
                </span>
              </div>
            </div>
          </div>
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <div style={{width: 499, display: 'flex', justifyContent: 'space-between', marginBottom: 34}}>
              {proposal.options.map((proposal, i) =>
                <button
                  key={i}
                  style={walletAddress ? optionButtonStyles : disabledOptionButtonStyles}
                  disabled={!walletAddress}
                  onClick={() => setOption(proposal.optionName)}
                >
                  <div style={{fontWeight: '700', fontSize: '14px'}}>Option</div>
                  <div style={{fontWeight: '700', fontSize: '40px'}}>{proposal.optionName}</div>
                </button>
              )}
            </div>
          </div>
          <div>
            {walletAddress
              ? <CastVoteButton text={'Cast Vote'} castVote={castVote} />
              : <ConnectButton connectAccount={connectAccount} />}
          </div>
          <Modal text={'This wallet does not hold a vote NFT.'} display={false} />
        </div>
      </div>
    </div>
  )
}

export default VoteCard
