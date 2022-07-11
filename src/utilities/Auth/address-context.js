import React from 'react'

const AddressContext = React.createContext(null)

/*
  MARK: - custom hook to be consumed by any component that requires user's wallet address
  Usage:
    import { useAddress } from './address-context'

    const address = useAddress()
*/
const useAddress = () => React.useContext(AddressContext)

const AddressProvider = ({ value, children }) => {
  return (
    <AddressContext.Provider value={value}>
      {children}
    </AddressContext.Provider>
  )
}

// export default { AddressContext, useAddress }
export default { AddressProvider, useAddress }
