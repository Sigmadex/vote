/*
  MARK: - All data formatting methods go here
*/

export const truncateAddress = (address) => {
  return address.substring(0, 6) + '...' + address.substring(address.length - 4)
}
