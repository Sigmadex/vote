import React from 'react';
import { Link } from 'react-router-dom'
import ConnectButton from '../ConnectButton'

const proposalId = 'SEP-002'
const propsalTitle = 'Launch Strategy'
const proposalLink = 'https://sigmadex.org/'
let options = [
  {
    name: 'A',
    id: 1,
    votes: 45
  },
  {
    name: 'B',
    id: 2,
    votes: 24
  },
  {
    name: 'C',
    id: 3,
    votes: 31
  }
]
const isAuthenticated = true // import checkAuthentication() from Auth class

const Vote = () => {
  return (
    <VotePortal />
  );
}

const VoteButton = () => {
  function casVote() {
    alert('Casting vote')
  }

  return (
    <button onClick={() => casVote()}>Cast Vote</button>
  )
}

const Error = (message) => { // abstract into own folder
  return (
    <h3>This wallet does not hold a vote NFT.</h3>
  )
}

// Abstract into own folder
const Polls = () => { // pass options as parameter
  const totalVotes = options.reduce((total, option) => total + option.votes, 0)

  return (
    <div>
      <span>Your vote has been recorded on chain</span>
      <div>
        {options.map((option, index) => {
          let percentage = Math.round(option.votes / totalVotes)
          return (
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              <div>Option {option.name}</div>
              <div>
                {percentage}%
                <span>bar</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const votePortalStyles = {
  // paddingTop: '36px',
  paddingLeft: '36px',
  paddingRight: '36px'
}

const VotePortal = () => {
  return (
    <div style={votePortalStyles} className='vote-portal'>
      <h3>Vote Portal</h3>
      <span>Connect your wallet to see if you qualify for voting.</span>

      {/* <img style={{backgroundImage: 'linear-gradient(#b2ddad, #74bce5)'}} alt='block' src='/images/endless-layered 2.png' /> */}

      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <div>Proposal ID:</div>
        <div>{proposalId}</div>
      </div>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <div>RE:</div>
        <div>{propsalTitle}</div>
      </div>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <div>Forum Link:</div>
        <Link to={proposalLink}>View</Link>
      </div>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        {options.map((option, index) =>
          // class=isAuthenticated ? '' : 'disabled'
          <div key={index} onClick={() => console.log('clicked on option', option.name)}>{option.name}</div>
        )}
      </div>
      {isAuthenticated
        ? <VoteButton />
        : <ConnectButton />}
      {/* <Polls /> */}
      {/* <Error /> */}
    </div>
  )
}

export default Vote;
