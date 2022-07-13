import { createContext } from 'react'

const AddressContext = createContext()

export default AddressContext

/*
  TODO:
  Create a custom provider e.g.:
    const AddressProvider = ({ value, children }) => {
      return (
        <AddressContext.Provider value={value}>
          {children}
        </AddressContext.Provider>
      )
    }

  Create a custom hook e.g.:
    const useAddress = () => React.useContext(AddressContext)

  Export as such:
  export default { AddressProvider, useAddress }
*/
