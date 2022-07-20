/*
  MARK: - All data formatting methods go here
*/
import { ethers } from 'ethers'

export const truncateAddress = (address) => {
  return address.substring(0, 6) + '...' + address.substring(address.length - 4)
}

export async function createBytes(args) {
  let name = args[0]
  let bytes = ethers.utils.formatBytes32String(name)
  return bytes
}

export async function parseBytes(args) {
  let bytes = args[0]
  let name = await ethers.utils.parseBytes32String(bytes)
  return name
}
