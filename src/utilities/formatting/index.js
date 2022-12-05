/*
  All data formatting methods go here
*/
import { ethers } from 'ethers'

export const truncateAddress = (address) => {
  return address.substring(0, 6) + '...' + address.substring(address.length - 4)
}

// TODO: - Make async?
export const formatBytes = (text) => {
  return ethers.utils.formatBytes32String(text)
}

// convert byte32 into string
export const parseBytes = (bytes32) => {
  return ethers.utils.parseBytes32String(bytes32)
}

// convert the dash of the string into a space
export const parseName = (name) => {
  const newName = name.replace('-', ' ')
  return newName[0].toUpperCase() + newName.substring(1)
}