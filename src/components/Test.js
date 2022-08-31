import Modal from './Modal'
import { ethers } from 'ethers'
import { formatBytes, parseBytes } from '../utilities/formatting'

function Test() {
  // async function parseBytes(args) {
  //   let bytes = args[0]
  //   let name = ethers.utils.parseBytes32String(bytes)
  //   return name
  // }

  let text = "Hello World!"

  let bytes32 = formatBytes(text)
  // "0x48656c6c6f20576f726c64210000000000000000000000000000000000000000"
  console.log(bytes32)
  //
  let originalText = parseBytes(bytes32)
  console.log(originalText)

  // console.log(parseBytes('0x0000000000000000000000000000000000000000000000000000000000000000'))

  return (
    <div>
      <Modal text={'This wallet does not hold a vote NFT.'} />
    </div>
  )
}

export default Test
