/*
  All data formatting methods go here
*/
import { ethers } from 'ethers'

export const truncateAddress = (address) => {
  return address.substring(0, 6) + '...' + address.substring(address.length - 4)
}

// TODO: - Make async?
export function formatBytes(text) {
  return ethers.utils.formatBytes32String(text)
}

export function parseBytes(bytes32) {
  return ethers.utils.parseBytes32String(bytes32)
}
