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
        <div className='modal-content'>
          <span>
            <img
              style={{width: '32px', height: '32px', marginBottom: '16px'}}
              alt='Warning'
              src='/images/warning.png'
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
