import { useState, useEffect } from 'react'

function Modal({text, display}) {
  const [modalOpen, toggleModal] = useState(false)

  useEffect(() => {
    toggleModal(display)
  }, [])

  return (
    <div>
      {/* button is for debugging */}
      {/* <button onClick={() => toggleModal(!modalOpen)}>toggle modal</button>  */}
      <div
        className='modal'
        style={{display: modalOpen ? 'block' : 'none'}}
        onClick={() => toggleModal(!modalOpen)}
      >
        <div className='modal-content' style={{textAlign: 'center'}}>
          <span>
            <img
              style={{width: '32px', height: '32px', marginBottom: 20}}
              alt='Warning'
              src='/images/warning.svg'
            />
          </span>
          <span style={{width: 218}}>
            This wallet does not hold a vote NFT.
          </span>
        </div>
      </div>
    </div>
  )
}

export default Modal
