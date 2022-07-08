import { useState, useEffect } from 'react';

const cardStyles = {
  width: '604px',
  height: '492px',
  backgroundColor: '#FFFFFF',
  boxShadow: '0px 4px 25px rgba(64, 76, 85, 0.15)',
  borderRadius: '20px'
}

const centerDiv = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  color: '#404C55' // add to universal styles
}

const optionButtonStyles = {
  width: '142px',
  height: '109px',
  background: '#FFFFFF',
  border: '1px solid #B3BEC6',
  boxShadow: '0px 4px 20px rgba(166, 194, 215, 0.3)',
  borderRadius: '20px',
  cursor: 'pointer'
}

function VoteCard({proposal}) {
  const [selectedOption, setOption] = useState(null)

  // MARK: - Write method for highlighting selected option

  const OptionButton = ({option}) => {
    return (
      // use actual button for OptionButton?
      <div style={optionButtonStyles} onClick={() => setOption(option)}>
        Option
        <div>{option}</div>
      </div>
    )
  }

  function castVote() {
    if (selectedOption) {
      console.log('casting vote for', selectedOption)
    }
  }

  return (
    <div style={centerDiv}>
      <div style={cardStyles}>
        <span style={{fontSize: '38px', fontWeight: '700'}}>Vote Portal</span>
        Select one of the three options below and submit your vote.
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <div>Proposal ID: {proposal.id}</div>
          <div>RE: {proposal.subject}</div>
          <div>Forum Link: {proposal.link}</div>
        </div>
        {proposal.options.map((p, i) => <div key={i}><OptionButton option={p.optionName} /></div>)}
        <button onClick={() => castVote()}>Cast Vote</button>
      </div>
    </div>
  )
}

export default VoteCard
