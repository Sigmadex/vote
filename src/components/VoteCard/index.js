import { useState, useContext } from 'react'
import { AddressContext } from '../../utilities/Auth'
import ConnectButton from '../ConnectButton'
import CastVoteButton from '../CastVoteButton'
import Modal from '../Modal'

const cardStyles = {
  width: '604px',
  height: '492px',
  backgroundColor: '#FFFFFF',
  boxShadow: '0px 4px 25px rgba(64, 76, 85, 0.15)',
  borderRadius: '20px'
}

// const centerDiv = {
//   display: 'flex',
//   justifyContent: 'center',
//   alignItems: 'center',
//   height: '100vh',
//   color: '#404C55' // add to universal styles
// }

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

  const OptionButton = ({option, walletAddress}) => {
    return (
      <button
        style={walletAddress ? optionButtonStyles : disabledOptionButtonStyles}
        disabled={!walletAddress}
        onClick={() => setOption(option)}
      >
        <div style={{fontWeight: '700', fontSize: '14px'}}>Option</div>
        <div style={{fontWeight: '700', fontSize: '40px'}}>{option}</div>
      </button>
    )
  }

  function castVote() {
    if (selectedOption) {
      console.log('casting vote for', selectedOption)
    }
  }

  return (

    <div style={{textAlign: 'center'}}>

      <img
        style={{width: '468px', height: '266px'}}
        alt='Pixel Guys'
        src='/images/pixel-guys.png'
      />

      <div>
        <div style={cardStyles}>
          <span style={{fontSize: '38px', fontWeight: '700'}}>Vote Portal</span>
          {walletAddress
            ? 'Select one of the three options below and submit your vote.'
            : 'Connect your wallet to see if you qualify for voting.'}
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <div>Proposal ID: {proposal.id}</div>
            <div>RE: {proposal.subject}</div>
            <div>Forum Link: {proposal.link}</div>
          </div>
          {proposal.options.map((p, i) =>
            <div key={i}>
              <OptionButton option={p.optionName} walletAddress={walletAddress} />
            </div>
          )}
          {walletAddress
            // ? <button onClick={() => castVote()}>Cast Vote</button>
            ? <CastVoteButton text={'Cast Vote'} castVote={castVote} />
            : <ConnectButton connectAccount={connectAccount} />}
          <Modal text={'This wallet does not hold a vote NFT.'} display={false} />
        </div>
      </div>

    </div>
  )
}

export default VoteCard
