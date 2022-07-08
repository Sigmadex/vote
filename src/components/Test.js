import { useState } from 'react';
import { ethers } from 'ethers';
import { truncateAddress } from '../utilities/formatting'
import VoteCard from './VoteCard'

let proposal = {
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

function Test() {
  return (
    <VoteCard proposal={proposal} />
  )
}

export default Test;
