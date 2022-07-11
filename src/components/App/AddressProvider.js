import React from 'react'

const AddressContext = React.createContext(null)

const useAddress = () => React.useContext(AddressContext)

const AddressProvider = ({ value, children }) => {
  return (
    <AddressContext.Provider value={value}>
      {children}
    </AddressContext.Provider>
  )
}

// export default { AddressContext, useAddress }
export { AddressProvider, useAddress }
