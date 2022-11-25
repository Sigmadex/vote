import { useState, useEffect, useContext } from 'react'
import { ethers } from 'ethers'
import TokenArtifact from '../ABI/Ballot.json'
import contractAddress from '../ABI/contract-address.json'
import { parseName, parseBytes } from '../utils'
import { AddressContext } from '../utilities/Auth'
import ConnectButton from './ConnectButton'
import Charts from './Charts'
import { truncateAddress } from '../utilities/formatting'

const pollStyles = {
  width: '604px',
  // height: '304px',
  backgroundColor: '#FFFFFF',
  boxShadow: '0px 4px 25px rgba(64, 76, 85, 0.15)',
  borderRadius: '20px',
  color: '#404C55',
  paddingBottom: '38px'
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

const VoteCard2 = ({walletAddress, testProposal, connectAccount, proposals, voteProposal, voterStatus}) => {
  // const walletAddress = useContext(AddressContext) // pass from props
  const [selectedOption, setOption] = useState(undefined)
  const [displayModal, toggleModal] = useState(false)

  function castVote() {
    if (selectedOption !== undefined) {
      voteProposal(selectedOption)
    } else {
      alert('Please select an option')
    }
  }

  return (
    <div>
      <h2>Vote Card 2</h2>
      <div style={{textAlign: 'center', fontSize: '14px'}}>
        <img
          // style={{width: '468px', height: '266px'}}
          alt='Pixel Guys'
          src='/images/pixel-guys.svg'
        />
        {walletAddress && voterStatus && Number(voterStatus.weight._hex) > 0
          ? voterStatus.voted
            ? (<div style={pollStyles}>
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
              </div>)
            : proposals.map((proposal, index) => {
                const name = parseName(parseBytes(proposal.name))
                return (
                  <button
                    key={index}
                    style={walletAddress ? optionButtonStyles : disabledOptionButtonStyles}
                    onClick={() => setOption(index)}
                  >
                    <span style={{fontWeight: '700', fontSize: '14px', display: 'block', marginTop: 8, marginBottom: -4}}>Option</span>
                    <span style={{fontWeight: '700', fontSize: '40px', display: 'block'}}>{truncateAddress(name)}</span>
                  </button>
                )
              })
          : proposals.map((proposal, index) => {
              const name = parseName(parseBytes(proposal.name))
              return (
                <button
                  key={index}
                  style={disabledOptionButtonStyles}
                  disabled={true}
                >
                  <span style={{fontWeight: '700', fontSize: '14px', display: 'block', marginTop: 8, marginBottom: -4}}>Option</span>
                  <span style={{fontWeight: '700', fontSize: '40px', display: 'block'}}>{truncateAddress(name)}</span>
                </button>
              )
            })}
      </div>
    </div>
  )
}

export default VoteCard2