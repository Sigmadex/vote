const buttonStyles = {
  width: '142px',
  height: '46px',
  border: '1px solid #404C55',
  borderRadius: '10px',
  backgroundColor: 'transparent',
  fontSize: '14px',
  fontWeight: '600',
  cursor: 'pointer',
  color: '#404C55',
  // display: 'flex',
  // flexDirection: 'column',
  // justifyContent: 'center',
  // alignItems: 'center',
  // padding: '0px'
}

const CastVoteButton = ({castVote}) => {
  return (
    <button
      style={buttonStyles}
      onClick={castVote}
    >
      Cast Vote
    </button>
  )
}

export default CastVoteButton;
